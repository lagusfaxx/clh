-- Extensiones PostGIS y trigram (la creación se hace también en docker init,
-- pero la mantenemos aquí para entornos no-docker / migrate deploy).
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('VIEWER', 'CONTRIBUTOR', 'CURATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('BATALLA', 'FUNDACION', 'DESASTRE_NATURAL', 'PATRIMONIO', 'PUEBLOS_ORIGINARIOS', 'POLITICA', 'CULTURA', 'ECONOMIA', 'RELIGION', 'TRANSPORTE', 'CIENCIA');

-- CreateEnum
CREATE TYPE "HistoricalEra" AS ENUM ('PREHISPANICA', 'CONQUISTA', 'COLONIA', 'INDEPENDENCIA', 'REPUBLICA_TEMPRANA', 'PARLAMENTARISMO', 'PRESIDENCIALISMO', 'DICTADURA', 'TRANSICION');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('BIBLIOTECA_NACIONAL', 'MEMORIA_CHILENA', 'ARCHIVO_NACIONAL', 'WIKIPEDIA', 'ACADEMIC_PAPER', 'BOOK', 'PRIMARY_DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('PHOTO_HISTORIC', 'PHOTO_MODERN', 'ILLUSTRATION', 'DOCUMENT_SCAN', 'AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "RecreationStatus" AS ENUM ('PENDING', 'GENERATING', 'COMPLETED', 'FAILED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "emailVerified" TIMESTAMP(3),
  "name" TEXT,
  "image" TEXT,
  "role" "UserRole" NOT NULL DEFAULT 'VIEWER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
  "id" TEXT NOT NULL,
  "sessionToken" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "HistoricalEvent" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "shortDesc" TEXT NOT NULL,
  "longDesc" TEXT NOT NULL,
  "yearStart" INTEGER NOT NULL,
  "yearEnd" INTEGER,
  "dateText" TEXT,
  "category" "EventCategory" NOT NULL,
  "era" "HistoricalEra" NOT NULL,
  "latitude" DOUBLE PRECISION NOT NULL,
  "longitude" DOUBLE PRECISION NOT NULL,
  "zoneGeoJson" JSONB,
  "region" TEXT NOT NULL,
  "comuna" TEXT,
  "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
  "createdById" TEXT NOT NULL,
  "curatedById" TEXT,
  "curatedAt" TIMESTAMP(3),
  "views" INTEGER NOT NULL DEFAULT 0,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "HistoricalEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
  "id" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "type" "SourceType" NOT NULL,
  "title" TEXT NOT NULL,
  "author" TEXT,
  "year" INTEGER,
  "url" TEXT,
  "signature" TEXT,
  "citation" TEXT NOT NULL,
  "inPublicDomain" BOOLEAN NOT NULL DEFAULT false,
  "licenseInfo" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
  "id" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "type" "MediaType" NOT NULL,
  "url" TEXT NOT NULL,
  "thumbnailUrl" TEXT,
  "caption" TEXT,
  "yearTaken" INTEGER,
  "attribution" TEXT NOT NULL,
  "isHistorical" BOOLEAN NOT NULL DEFAULT true,
  "fileSize" INTEGER,
  "width" INTEGER,
  "height" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiRecreation" (
  "id" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "targetYear" INTEGER NOT NULL,
  "prompt" TEXT NOT NULL,
  "negativePrompt" TEXT,
  "imageUrl" TEXT,
  "thumbnailUrl" TEXT,
  "model" TEXT NOT NULL,
  "status" "RecreationStatus" NOT NULL DEFAULT 'PENDING',
  "errorMsg" TEXT,
  "generationCost" DOUBLE PRECISION,
  "approvedAt" TIMESTAMP(3),
  "approvedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AiRecreation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioNarration" (
  "id" TEXT NOT NULL,
  "eventId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "duration" INTEGER NOT NULL,
  "voice" TEXT NOT NULL,
  "language" TEXT NOT NULL DEFAULT 'es-CL',
  "text" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AudioNarration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
CREATE UNIQUE INDEX "HistoricalEvent_slug_key" ON "HistoricalEvent"("slug");
CREATE INDEX "HistoricalEvent_yearStart_yearEnd_idx" ON "HistoricalEvent"("yearStart", "yearEnd");
CREATE INDEX "HistoricalEvent_category_idx" ON "HistoricalEvent"("category");
CREATE INDEX "HistoricalEvent_era_idx" ON "HistoricalEvent"("era");
CREATE INDEX "HistoricalEvent_region_idx" ON "HistoricalEvent"("region");
CREATE INDEX "HistoricalEvent_status_idx" ON "HistoricalEvent"("status");
CREATE INDEX "HistoricalEvent_slug_idx" ON "HistoricalEvent"("slug");
CREATE INDEX "Source_eventId_idx" ON "Source"("eventId");
CREATE INDEX "Source_type_idx" ON "Source"("type");
CREATE INDEX "MediaAsset_eventId_idx" ON "MediaAsset"("eventId");
CREATE INDEX "MediaAsset_type_idx" ON "MediaAsset"("type");
CREATE UNIQUE INDEX "AiRecreation_eventId_targetYear_key" ON "AiRecreation"("eventId", "targetYear");
CREATE INDEX "AiRecreation_status_idx" ON "AiRecreation"("status");
CREATE INDEX "AiRecreation_eventId_idx" ON "AiRecreation"("eventId");
CREATE UNIQUE INDEX "AudioNarration_eventId_key" ON "AudioNarration"("eventId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "HistoricalEvent" ADD CONSTRAINT "HistoricalEvent_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "HistoricalEvent" ADD CONSTRAINT "HistoricalEvent_curatedById_fkey" FOREIGN KEY ("curatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Source" ADD CONSTRAINT "Source_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "HistoricalEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MediaAsset" ADD CONSTRAINT "MediaAsset_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "HistoricalEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiRecreation" ADD CONSTRAINT "AiRecreation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "HistoricalEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AiRecreation" ADD CONSTRAINT "AiRecreation_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AudioNarration" ADD CONSTRAINT "AudioNarration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "HistoricalEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- PostGIS: columna generada con geometría a partir de lat/lon
ALTER TABLE "HistoricalEvent"
  ADD COLUMN "location" geometry(Point, 4326)
  GENERATED ALWAYS AS (ST_SetSRID(ST_MakePoint("longitude", "latitude"), 4326)) STORED;

-- Índices espaciales y de búsqueda
CREATE INDEX "HistoricalEvent_location_gist_idx" ON "HistoricalEvent" USING GIST("location");
CREATE INDEX "HistoricalEvent_title_trgm_idx" ON "HistoricalEvent" USING GIN("title" gin_trgm_ops);
CREATE INDEX "HistoricalEvent_shortDesc_trgm_idx" ON "HistoricalEvent" USING GIN("shortDesc" gin_trgm_ops);
