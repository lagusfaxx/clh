import { startRecreationWorker } from './recreation-worker'
import { startNarrationWorker } from './narration-worker'

console.log('[worker] iniciando...')

const recreationWorker = startRecreationWorker()
const narrationWorker = startNarrationWorker()

console.log('[worker] listo (recreation + narration)')

async function shutdown(signal: string) {
  console.log(`[worker] recibida señal ${signal}, cerrando…`)
  await Promise.all([
    recreationWorker.close(),
    narrationWorker.close(),
  ])
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
