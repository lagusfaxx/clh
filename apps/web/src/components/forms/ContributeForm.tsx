'use client'
import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import {
  Button,
  Input,
  Textarea,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@chile-historico/ui'
import { createEventSchema, type CreateEventInput } from '@/lib/validators'
import { CATEGORY_META, ERA_META, REGIONES_CHILE, SOURCE_TYPE_META } from '@/lib/categories'
import { Plus, Trash2 } from 'lucide-react'

type Step = 'basics' | 'location' | 'context' | 'sources' | 'review'

const STEPS: Step[] = ['basics', 'location', 'context', 'sources', 'review']

export function ContributeForm() {
  const [step, setStep] = useState<Step>('basics')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<CreateEventInput>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      shortDesc: '',
      longDesc: '',
      yearStart: new Date().getFullYear(),
      yearEnd: null,
      category: 'PATRIMONIO',
      era: 'TRANSICION',
      latitude: -33.45,
      longitude: -70.65,
      region: 'Metropolitana',
      comuna: '',
      sources: [
        {
          type: 'BIBLIOTECA_NACIONAL',
          title: '',
          citation: '',
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'sources',
  })

  async function onSubmit(values: CreateEventInput) {
    setSubmitting(true)
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error ?? 'Error desconocido')
      router.push('/contribuir/gracias')
    } catch (err) {
      alert(`Error al enviar: ${err instanceof Error ? err.message : 'desconocido'}`)
      setSubmitting(false)
    }
  }

  function next() {
    const idx = STEPS.indexOf(step)
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]!)
  }
  function prev() {
    const idx = STEPS.indexOf(step)
    if (idx > 0) setStep(STEPS[idx - 1]!)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Stepper current={step} />

      {step === 'basics' && (
        <Card>
          <CardHeader>
            <CardTitle>1 · Información básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Título" error={form.formState.errors.title?.message}>
              <Input {...form.register('title')} />
            </Field>
            <Field label="Resumen breve" error={form.formState.errors.shortDesc?.message}>
              <Textarea rows={3} {...form.register('shortDesc')} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Año inicio" error={form.formState.errors.yearStart?.message}>
                <Input type="number" {...form.register('yearStart', { valueAsNumber: true })} />
              </Field>
              <Field label="Año fin (opcional)">
                <Input
                  type="number"
                  {...form.register('yearEnd', {
                    valueAsNumber: true,
                    setValueAs: (v) => (v === '' || Number.isNaN(v) ? null : v),
                  })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Categoría">
                <Select
                  value={form.watch('category')}
                  onValueChange={(v) => form.setValue('category', v as never)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORY_META).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Era histórica">
                <Select
                  value={form.watch('era')}
                  onValueChange={(v) => form.setValue('era', v as never)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(ERA_META).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'location' && (
        <Card>
          <CardHeader>
            <CardTitle>2 · Ubicación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Región">
              <Select
                value={form.watch('region')}
                onValueChange={(v) => form.setValue('region', v)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {REGIONES_CHILE.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Comuna (opcional)">
              <Input {...form.register('comuna')} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Latitud" error={form.formState.errors.latitude?.message}>
                <Input
                  type="number"
                  step="0.0001"
                  {...form.register('latitude', { valueAsNumber: true })}
                />
              </Field>
              <Field label="Longitud" error={form.formState.errors.longitude?.message}>
                <Input
                  type="number"
                  step="0.0001"
                  {...form.register('longitude', { valueAsNumber: true })}
                />
              </Field>
            </div>
            <p className="text-xs text-text-secondary">
              Tip: usa <a className="text-accent-gold underline" href="https://www.openstreetmap.org" target="_blank" rel="noreferrer">OpenStreetMap</a> para encontrar las coordenadas exactas.
            </p>
          </CardContent>
        </Card>
      )}

      {step === 'context' && (
        <Card>
          <CardHeader>
            <CardTitle>3 · Descripción y contexto</CardTitle>
          </CardHeader>
          <CardContent>
            <Field label="Descripción larga (50-10.000 caracteres)" error={form.formState.errors.longDesc?.message}>
              <Textarea rows={10} {...form.register('longDesc')} />
            </Field>
          </CardContent>
        </Card>
      )}

      {step === 'sources' && (
        <Card>
          <CardHeader>
            <CardTitle>4 · Fuentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((f, i) => (
              <div key={f.id} className="space-y-3 rounded-sm border border-border bg-bg-secondary p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-medium text-accent-gold">Fuente #{i + 1}</span>
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(i)} className="text-text-secondary hover:text-accent-rust">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Field label="Tipo">
                  <Select
                    value={form.watch(`sources.${i}.type`)}
                    onValueChange={(v) => form.setValue(`sources.${i}.type`, v as never)}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(SOURCE_TYPE_META).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Título de la fuente">
                  <Input {...form.register(`sources.${i}.title`)} />
                </Field>
                <Field label="Cita formal (estilo APA)">
                  <Textarea rows={2} {...form.register(`sources.${i}.citation`)} />
                </Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="URL (opcional)">
                    <Input type="url" {...form.register(`sources.${i}.url`)} />
                  </Field>
                  <Field label="Signatura BN (opcional)">
                    <Input {...form.register(`sources.${i}.signature`)} />
                  </Field>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                append({ type: 'OTHER', title: '', citation: '' })
              }
            >
              <Plus className="h-4 w-4" />
              Añadir fuente
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'review' && (
        <Card>
          <CardHeader>
            <CardTitle>5 · Revisar y enviar</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="max-h-96 overflow-auto rounded-sm bg-bg-secondary p-3 text-xs text-text-secondary">
              {JSON.stringify(form.getValues(), null, 2)}
            </pre>
            <p className="mt-3 text-xs text-text-secondary">
              Tu envío entrará en estado <strong>Pendiente de revisión</strong>. Un curador
              lo aprobará o solicitará ajustes en los próximos días.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={prev} disabled={step === 'basics'}>
          Atrás
        </Button>
        {step === 'review' ? (
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Enviando…' : 'Enviar para revisión'}
          </Button>
        ) : (
          <Button type="button" onClick={next}>
            Siguiente
          </Button>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-accent-rust">{error}</p>}
    </div>
  )
}

function Stepper({ current }: { current: Step }) {
  return (
    <ol className="flex items-center justify-between text-xs text-text-secondary">
      {STEPS.map((s, i) => (
        <li
          key={s}
          className={`flex flex-1 items-center gap-2 ${
            STEPS.indexOf(current) >= i ? 'text-accent-gold' : ''
          }`}
        >
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full border ${
              STEPS.indexOf(current) >= i
                ? 'border-accent-gold bg-accent-gold/10'
                : 'border-border'
            }`}
          >
            {i + 1}
          </span>
          {i < STEPS.length - 1 && (
            <span
              className={`h-px flex-1 ${
                STEPS.indexOf(current) > i ? 'bg-accent-gold' : 'bg-border'
              }`}
            />
          )}
        </li>
      ))}
    </ol>
  )
}
