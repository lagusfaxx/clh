/**
 * Seed runner: carga eventos iniciales en la base de datos.
 * Idempotente: usa upsert por slug.
 *
 * Uso:
 *   pnpm seed
 *   pnpm seed -- --reset   # borra todo antes de seedear
 */
import { prisma } from '@chile-historico/db'
import { INITIAL_EVENTS, SEED_VERSION } from './initial-events'
import { SANTIAGO_EVENTS } from './santiago-events'

async function getOrCreateSeedUser() {
  return prisma.user.upsert({
    where: { email: 'seed@chilehistorico.cl' },
    update: {},
    create: {
      email: 'seed@chilehistorico.cl',
      name: 'Equipo Chile Histórico',
      role: 'ADMIN',
    },
  })
}

async function seed() {
  const args = new Set(process.argv.slice(2))
  const reset = args.has('--reset')

  const ALL_EVENTS = [...INITIAL_EVENTS, ...SANTIAGO_EVENTS]

  console.log(`\nSeed Chile Histórico v${SEED_VERSION}`)
  console.log(`Eventos a insertar: ${ALL_EVENTS.length}`)
  console.log(`  - Iniciales (curados): ${INITIAL_EVENTS.length}`)
  console.log(`  - Santiago Metropolitana: ${SANTIAGO_EVENTS.length}\n`)

  if (reset) {
    console.log('--reset activado: borrando datos previos...')
    await prisma.aiRecreation.deleteMany()
    await prisma.audioNarration.deleteMany()
    await prisma.mediaAsset.deleteMany()
    await prisma.source.deleteMany()
    await prisma.historicalEvent.deleteMany()
    console.log('  datos previos eliminados\n')
  }

  const seedUser = await getOrCreateSeedUser()

  let created = 0
  let updated = 0

  for (const ev of ALL_EVENTS) {
    const existing = await prisma.historicalEvent.findUnique({
      where: { slug: ev.slug },
    })

    const payload = {
      slug: ev.slug,
      title: ev.title,
      shortDesc: ev.shortDesc,
      longDesc: ev.longDesc,
      yearStart: ev.yearStart,
      yearEnd: ev.yearEnd ?? null,
      dateText: ev.dateText ?? null,
      category: ev.category,
      era: ev.era,
      latitude: ev.latitude,
      longitude: ev.longitude,
      region: ev.region,
      comuna: ev.comuna ?? null,
      featured: ev.featured ?? false,
      status: 'PUBLISHED' as const,
    }

    if (existing) {
      await prisma.historicalEvent.update({
        where: { id: existing.id },
        data: payload,
      })
      // Limpiar fuentes previas para reinsertar
      await prisma.source.deleteMany({ where: { eventId: existing.id } })
      await prisma.source.createMany({
        data: ev.sources.map((s) => ({
          eventId: existing.id,
          type: s.type,
          title: s.title,
          author: s.author ?? null,
          year: s.year ?? null,
          url: s.url ?? null,
          signature: s.signature ?? null,
          citation: s.citation,
          inPublicDomain: s.inPublicDomain ?? false,
          licenseInfo: s.licenseInfo ?? null,
        })),
      })
      updated++
      console.log(`  ↻ ${ev.slug}`)
    } else {
      await prisma.historicalEvent.create({
        data: {
          ...payload,
          createdById: seedUser.id,
          curatedById: seedUser.id,
          curatedAt: new Date(),
          sources: {
            create: ev.sources.map((s) => ({
              type: s.type,
              title: s.title,
              author: s.author ?? null,
              year: s.year ?? null,
              url: s.url ?? null,
              signature: s.signature ?? null,
              citation: s.citation,
              inPublicDomain: s.inPublicDomain ?? false,
              licenseInfo: s.licenseInfo ?? null,
            })),
          },
        },
      })
      created++
      console.log(`  + ${ev.slug}`)
    }
  }

  console.log(`\nSeed completado: ${created} creados, ${updated} actualizados.\n`)
}

seed()
  .catch((err) => {
    console.error('Seed falló:', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
