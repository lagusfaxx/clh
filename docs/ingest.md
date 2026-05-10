# Ingesta de fuentes externas

El paquete `@chile-historico/ingest` provee:

1. Seed estático con 20 eventos curados (`src/seed/initial-events.ts`).
2. Stubs de ingestores para Biblioteca Nacional y Memoria Chilena.

## Seed inicial

```bash
pnpm seed              # idempotente (upsert por slug)
pnpm seed -- --reset   # limpia y recarga
```

El seed inserta 20 eventos `PUBLISHED` con sus fuentes asociadas. Cada uno está
verificable con citas completas. El usuario `seed@chilehistorico.cl` queda
registrado como `createdBy` y `curatedBy`.

> ⚠️ **Aviso de calidad**: estos 20 eventos son placeholder data para arrancar
> el MVP. Las descripciones, fechas y coordenadas deben ser validadas por un
> curador histórico (idealmente con apoyo de BN/MC) antes de uso público real.
> Esta advertencia está documentada en código.

## Ingestor BN (stub)

`src/sources/biblioteca-nacional.ts` define la firma:

```ts
searchBibliotecaNacional({
  collection: 'manuscritos' | 'fotografias' | 'periodicos' | 'libros',
  query: string,
  limit?: number,
}): Promise<SeedEvent[]>
```

Para implementarlo en producción, recomendamos:

1. Negociar acceso institucional a BNDigital con DIBAM.
2. Consumir su endpoint OAI-PMH si está disponible (resumption tokens, ListRecords).
3. Mapear los registros Dublin Core al modelo `SeedEvent`.

## Ingestor Memoria Chilena (stub)

Memoria Chilena no tiene API. Posibilidades:

1. Scraping respetuoso del `sitemap.xml`.
2. Procesar minisitios temáticos uno a uno.
3. Respetar `robots.txt` y agregar User-Agent identificable
   (`ChileHistoricoBot/0.1 (+contacto@chilehistorico.cl)`).

Una vez implementado:

```bash
pnpm ingest:bn -- --collection fotografias --query "Salitre"
pnpm ingest:mc -- --topic "Independencia"
```

## Pipeline futuro

Idealmente la ingesta corre como cron job en el worker:

1. Cada N días, scraping incremental de fuentes nuevas.
2. Crear eventos en estado `DRAFT`.
3. Avisar al equipo de curaduría por email.
4. Curador revisa, edita y publica.
