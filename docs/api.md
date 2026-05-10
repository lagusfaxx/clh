# API Reference

Todas las rutas viven bajo `/api/*`. Respuestas JSON. Errores con código HTTP
estándar.

## Autenticación

Cookies de sesión NextAuth.js. Endpoints que requieren auth devuelven `401`
si no hay sesión y `403` si el rol es insuficiente.

Roles: `VIEWER < CONTRIBUTOR < CURATOR < ADMIN`.

## Rate limiting

Fixed-window por IP. Default 60 req/min. Algunas rutas tienen límites
específicos (ej. `/recreations/request` limita a 5/min).

---

## Eventos

### `GET /api/events`

Lista paginada de eventos publicados.

Query params:

| Param | Tipo | Default |
|---|---|---|
| `page` | int | 1 |
| `pageSize` | int | 20 |
| `yearFrom` | int | — |
| `yearTo` | int | — |
| `categories` | csv (`BATALLA,FUNDACION,...`) | — |
| `eras` | csv | — |
| `regions` | csv | — |
| `q` | string | — |

Response:

```json
{
  "items": [
    { "id": "...", "slug": "...", "title": "...", ... }
  ],
  "page": 1,
  "pageSize": 20,
  "total": 153
}
```

Cache: `s-maxage=60, stale-while-revalidate=300`.

### `POST /api/events`

Crea un evento nuevo en estado `PENDING_REVIEW`. Requiere rol `CONTRIBUTOR`.

Body: ver `createEventSchema` en `apps/web/src/lib/validators.ts`.

Response: `201 { event: {...} }`.

### `GET /api/events/geo`

GeoJSON-friendly: features para el mapa con bbox y filtros. Retorna columnas
mínimas para renderizado eficiente.

Query: `bbox=west,south,east,north`, `yearFrom`, `yearTo`, `categories`,
`eras`, `regions`, `withHistoricMedia`, `withRecreation`.

Response:

```json
{
  "features": [
    {
      "id": "...",
      "slug": "...",
      "title": "...",
      "category": "FUNDACION",
      "era": "CONQUISTA",
      "yearStart": 1541,
      "yearEnd": null,
      "longitude": -70.65,
      "latitude": -33.44,
      "hasHistoricMedia": true,
      "hasRecreation": false
    }
  ]
}
```

### `GET /api/events/[slug]`

Detalle completo. Sólo eventos `PUBLISHED`. Incluye `sources`, `media`,
`recreations`, `narration`.

### `GET /api/events/by-id/[id]`

Detalle por ID (usado por el panel del mapa).

### `PATCH /api/events/[slug]`

Edita un evento. Requiere rol `CURATOR`.

Body: `updateEventSchema` (parcial). Si `status` cambia a `PUBLISHED`, se
asigna `curatedById` y `curatedAt`.

---

## Recreaciones IA

### `POST /api/recreations/request`

Solicita generación de imagen IA para `(eventId, targetYear)`. Idempotente.

Body:

```json
{ "eventId": "cuid_...", "targetYear": 1850 }
```

Si ya existe (cualquier estado), devuelve la existente. Si no, crea registro
en `PENDING` y encola job en BullMQ.

Response: `202 { recreation: {...}, queued: true }`.

Rate limit: 5/min/IP.

### `GET /api/recreations/[id]`

Estado actual de una recreación. Polling-friendly.

### `GET /api/recreations/events/[id]`

Lista todas las recreaciones de un evento.

---

## Narrativa y narración

### `POST /api/events/[id]/narrative`

Genera narrativa de 400-600 palabras con Claude. Cacheada en Redis 30 días.

Response:

```json
{
  "text": "...",
  "model": "claude-haiku-4-5-...",
  "inputTokens": 312,
  "outputTokens": 480,
  "estimatedCostUsd": 0.0027
}
```

### `GET /api/events/[id]/narration`

Devuelve URL de narración mp3 si existe. `404` si no.

### `POST /api/events/[id]/narration`

Encola job de TTS. `202` cuando se encola.

---

## Búsqueda y timeline

### `GET /api/search?q=`

Búsqueda full-text con `pg_trgm` sobre `title` + `shortDesc`. Mínimo 2 chars.

### `GET /api/timeline?from=&to=`

Eventos en rango temporal, ordenados por año.

---

## Curaduría (admin)

### `POST /api/admin/curaduria/[id]`

Aprueba, rechaza o solicita cambios. Requiere rol `CURATOR`.

Body:

```json
{ "action": "approve" | "reject" | "request_changes", "comment": "..." }
```

---

## Salud

### `GET /api/health`

```json
{ "status": "ok", "time": "2026-05-10T..." }
```

Devuelve `503` si la DB no responde.
