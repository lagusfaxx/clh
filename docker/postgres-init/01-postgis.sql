-- Habilita las extensiones requeridas al iniciar el contenedor de Postgres.
-- Se ejecuta una sola vez en initdb (cuando el data dir está vacío).

CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
