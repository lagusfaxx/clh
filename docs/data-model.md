# Modelo de datos

PostgreSQL 16 + extensiones **PostGIS** y **pg_trgm**.

## Diagrama

```
User ──┬──< HistoricalEvent (createdBy)
       └──< HistoricalEvent (curatedBy)
       └──< AiRecreation (approvedBy)

HistoricalEvent ──< Source
                ──< MediaAsset
                ──< AiRecreation
                ──1 AudioNarration
```

## Tablas principales

### `User`

Usuarios autenticados (NextAuth.js). Roles: `VIEWER`, `CONTRIBUTOR`,
`CURATOR`, `ADMIN`.

### `HistoricalEvent`

Núcleo del modelo. Cada evento tiene:

- **Identidad**: `id` (cuid), `slug` (único, URL-friendly).
- **Contenido**: `title`, `shortDesc`, `longDesc`, `dateText`.
- **Temporal**: `yearStart`, `yearEnd` (negativos para a.C.), `era`.
- **Espacial**: `latitude`, `longitude`, `region`, `comuna`,
  `zoneGeoJson`, y la columna **generada** `location` (PostGIS Point 4326).
- **Editorial**: `category`, `status` (`DRAFT|PENDING_REVIEW|PUBLISHED|ARCHIVED`),
  `featured`, `views`.
- **Trazabilidad**: `createdById`, `curatedById`, `curatedAt`.

#### Columna `location` (PostGIS)

```sql
ALTER TABLE "HistoricalEvent"
  ADD COLUMN location geometry(Point, 4326)
  GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)) STORED;
```

Permite consultas espaciales sin mantener manualmente la geometría.

#### Índices

- `events_location_gist_idx` — GIST sobre `location` para queries por bbox.
- `events_title_trgm_idx`, `events_shortDesc_trgm_idx` — GIN trigram para
  búsqueda fuzzy.
- B-tree sobre `(yearStart, yearEnd)`, `category`, `era`, `region`, `status`.

### `Source`

Fuentes bibliográficas. Tipo enum: `BIBLIOTECA_NACIONAL`, `MEMORIA_CHILENA`,
`ARCHIVO_NACIONAL`, `WIKIPEDIA`, `ACADEMIC_PAPER`, `BOOK`, `PRIMARY_DOCUMENT`,
`OTHER`.

Campos clave:

- `citation` (texto APA completo)
- `signature` (signatura BN, ej. `BN-MS-12345`)
- `inPublicDomain` flag para reuso

### `MediaAsset`

Imágenes, audio, video, scans. Cada asset incluye `attribution` obligatoria
para uso responsable.

### `AiRecreation`

Imágenes generadas por modelos de imagen. Estados:

- `PENDING` — recién creada, encolada.
- `GENERATING` — worker la está procesando.
- `COMPLETED` — `imageUrl` y `thumbnailUrl` listos.
- `FAILED` — error en `errorMsg`.
- `REJECTED` — un curador la marcó como inadecuada.

Constraint `UNIQUE(eventId, targetYear)` garantiza una recreación por
(evento, año).

### `AudioNarration`

Una por evento (`UNIQUE(eventId)`). MP3 alojado en R2.

## Migraciones

Las migraciones viven en `packages/db/prisma/migrations/`. La inicial
`20260101000000_init_postgis` crea todas las tablas + columna PostGIS +
índices GIST/GIN en una sola transacción.

Para crear nuevas migraciones en dev:

```bash
pnpm db:migrate
# Sigue las instrucciones para nombrar la migración.
```

Para producción:

```bash
pnpm db:migrate:deploy
```

## Convenciones

- **No usar `INET` o tipos no estándar** en Prisma — preferir `String` y
  validar en aplicación. Esto facilita migración entre DBs.
- **Soft delete**: no implementado. Se usa `status='ARCHIVED'` en eventos.
- **JSONB** sólo para `zoneGeoJson` en eventos. Validar con Zod antes de
  persistir.

## Convenciones de búsqueda

- Búsqueda por **bbox** → `findEventsInBBox` (raw SQL con GIST).
- Búsqueda por **texto** → `searchEvents` (raw SQL con `pg_trgm` operador `%`
  + `similarity()` ordenando por relevancia).
