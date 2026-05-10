/**
 * TTS via ElevenLabs API. Si no hay key, devuelve buffer mock vacío.
 * Voz por defecto: pNInz6obpgDQGcFmaJgB (Adam, en inglés). Override con
 * ELEVENLABS_VOICE_ID. Para ES-CL recomendamos 21m00Tcm4TlvDq8ikWAM (Rachel)
 * o cualquier voz multilingual del catálogo.
 */
const ELEVENLABS_BASE = 'https://api.elevenlabs.io/v1'

export function isTtsAvailable(): boolean {
  return Boolean(process.env.ELEVENLABS_API_KEY)
}

export interface TtsResult {
  buffer: Buffer
  contentType: string
  voice: string
  durationSeconds: number
}

export async function synthesizeNarration(params: {
  text: string
  voiceId?: string
}): Promise<TtsResult> {
  const voice = params.voiceId ?? process.env.ELEVENLABS_VOICE_ID ?? '21m00Tcm4TlvDq8ikWAM'
  const apiKey = process.env.ELEVENLABS_API_KEY

  if (!apiKey) {
    return {
      buffer: Buffer.alloc(0),
      contentType: 'audio/mpeg',
      voice: 'mock',
      durationSeconds: estimateDuration(params.text),
    }
  }

  const res = await fetch(`${ELEVENLABS_BASE}/text-to-speech/${voice}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text: params.text,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.7,
        style: 0.25,
        use_speaker_boost: true,
      },
    }),
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`ElevenLabs TTS failed: ${res.status} ${txt}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  return {
    buffer,
    contentType: 'audio/mpeg',
    voice,
    durationSeconds: estimateDuration(params.text),
  }
}

/**
 * Estimación rápida de duración: ~150 palabras por minuto en castellano.
 */
function estimateDuration(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round((words / 150) * 60))
}
