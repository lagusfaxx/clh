# Despliegue en Coolify

Pasos exactos para desplegar Chile Histórico en un VPS Linux con Coolify v4
detrás de Traefik con certificado SSL automático.

## 1. Pre-requisitos

- VPS con Coolify v4 instalado y operativo (mínimo 4 GB RAM, 2 vCPU, 40 GB SSD).
- Dominio (`chilehistorico.cl`) administrado en Cloudflare.
- Cuentas y claves activas:
  - Mapbox (token público)
  - Anthropic (API key)
  - Replicate (API token)
  - Cloudflare R2 (account ID + access key + secret + bucket creado)
  - Google OAuth (Client ID + Secret) — si quieres login con Google
  - ElevenLabs (opcional)

## 2. Configuración DNS en Cloudflare

Crear los registros A apuntando al VPS:

| Tipo | Nombre | Valor | Proxy |
|---|---|---|---|
| A | `@` | IP_VPS | **DNS only** (gris) |
| A | `www` | IP_VPS | DNS only |
| CNAME | `media` | `<accountid>.r2.dev` o tu CNAME R2 | Proxy on |

> ⚠️ **DNS only** (no proxy) en el dominio principal: Traefik gestiona el SSL
> con Let's Encrypt y necesita ver el tráfico real. Activar proxy de Cloudflare
> rompe el handshake.

## 3. Crear bucket R2

1. Cloudflare → R2 → Crear bucket `chilehistorico-media`.
2. Crear API Token con permisos `Object Read & Write` para ese bucket.
3. (Opcional) Configurar dominio personalizado `media.chilehistorico.cl`
   apuntando al bucket público para servir las imágenes desde Cloudflare.

## 4. Crear proyecto en Coolify

1. **Coolify UI → + New Resource → Docker Compose**
2. **Git Repository**: pegar URL `https://github.com/lagusfaxx/clh.git`.
   Branch: `main`.
3. **Compose file**: `docker-compose.coolify.yml`
4. **Domain**: `chilehistorico.cl` (con `https://`)

## 5. Variables de entorno en Coolify

Pegar en la sección Environment Variables:

```bash
# Domain
DOMAIN=chilehistorico.cl

# Database (Coolify generará el password)
POSTGRES_USER=chilehistorico
POSTGRES_PASSWORD=<<generar 32 chars>>
POSTGRES_DB=chilehistorico
DATABASE_URL=postgresql://chilehistorico:<<password>>@postgres:5432/chilehistorico

# Redis
REDIS_URL=redis://redis:6379

# Auth
NEXTAUTH_URL=https://chilehistorico.cl
NEXTAUTH_SECRET=<<openssl rand -base64 32>>
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...
ANTHROPIC_MODEL=claude-haiku-4-5

# Replicate
REPLICATE_API_TOKEN=r8_...
REPLICATE_MODEL=black-forest-labs/flux-schnell

# Cloudflare R2
R2_ACCOUNT_ID=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=chilehistorico-media
R2_PUBLIC_URL=https://media.chilehistorico.cl

# ElevenLabs (opcional)
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM

# Feature flags
ENABLE_AI_GENERATION=true
ENABLE_TTS=false
```

## 6. Verificar Traefik labels

El `docker-compose.coolify.yml` ya incluye los labels Traefik:

```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.chilehistorico.rule=Host(`${DOMAIN}`)
  - traefik.http.routers.chilehistorico.entrypoints=websecure
  - traefik.http.routers.chilehistorico.tls.certresolver=letsencrypt
  - traefik.http.services.chilehistorico.loadbalancer.server.port=3000
```

Coolify expone Traefik en `:80` y `:443`. Si modificaste los entrypoints en
Traefik, ajusta el label.

## 7. Primer deploy

1. **Deploy** desde Coolify. La primera vez Coolify construye las imágenes
   `web` y `worker` (≈ 5-10 min).
2. Cuando los containers estén `healthy`, abrir **Terminal** en el container
   `web` y ejecutar:

```bash
# Aplicar migraciones (incluye PostGIS + columnas generadas + GIST)
node node_modules/.pnpm/prisma@5.20.0_typescript@5.5.4/node_modules/prisma/build/index.js migrate deploy --schema packages/db/prisma/schema.prisma

# Seed inicial 20 eventos
node packages/ingest/dist/seed/index.js
```

> Si prefieres, agrega un init container al compose que ejecute esos comandos
> automáticamente al arrancar. Comprobar en `apps/web/src/app/api/health` que
> responda 200 OK.

## 8. Verificar SSL

```bash
curl -I https://chilehistorico.cl
# HTTP/2 200
# server: traefik
# strict-transport-security: max-age=...
```

Si Let's Encrypt no emite certificado:

- Asegúrate que el DNS está propagado (`dig chilehistorico.cl +short`).
- Verifica que Cloudflare está en **DNS only** (no proxy) para ese dominio.
- Revisa logs de Traefik en Coolify.

## 9. Backups automáticos de Postgres

En el container `postgres` agregar un cron diario que dumpee a R2:

```bash
0 4 * * * pg_dump -U chilehistorico chilehistorico | gzip | \
  aws s3 cp - s3://chilehistorico-backups/postgres-$(date +\%Y\%m\%d).sql.gz \
  --endpoint-url https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com
```

Coolify v4 incluye una sección "Scheduled Backups" en el recurso Postgres que
puede simplificar esto.

## 10. Auto-deploy desde GitHub

Coolify provee un webhook de deploy por proyecto. Copiarlo a `secrets`:

- `COOLIFY_WEBHOOK_URL` = URL del webhook
- `COOLIFY_API_TOKEN` = token de autenticación

El workflow `.github/workflows/deploy.yml` lo dispara en cada push a `main`.

## 11. Monitoreo

- **Coolify** muestra logs y health de cada container.
- **Sentry**: define `SENTRY_DSN` en env y los errores client+server se
  reportan automáticamente (la integración Sentry no está incluida por
  defecto; agregar `@sentry/nextjs` si se desea).

## Troubleshooting

| Síntoma | Causa probable | Solución |
|---|---|---|
| `traefik` no rutea | DNS proxied en Cloudflare | Cambiar a "DNS only" |
| `certResolver: letsencrypt` failure | Rate limit Let's Encrypt | Esperar y reintentar |
| `Error: extension postgis is not available` | Imagen Postgres incorrecta | Usar `postgis/postgis:16-3.4-alpine` |
| Worker no procesa jobs | `REDIS_URL` mal formada | `redis://redis:6379` (servicio Docker) |
| Imágenes IA no se suben | Credenciales R2 inválidas | Re-generar API token, verificar bucket |
