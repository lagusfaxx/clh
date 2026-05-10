# Contribuir a Chile Histórico

Este proyecto crece con dos tipos de contribuciones: **históricas** (eventos,
fuentes, correcciones) y **técnicas** (código, tests, traducciones). Ambas son
bienvenidas y pasan por revisión humana.

## Para contribuidores históricos (no técnicos)

### 1. Crea una cuenta

Visita [chilehistorico.cl/login](https://chilehistorico.cl/login) e inicia
sesión con tu cuenta de Google. Por defecto recibes el rol *Viewer*.

### 2. Solicita rol de contribuidor

Escríbenos a `contribuir@chilehistorico.cl` indicando:

- Tu nombre y filiación (académica o personal)
- Áreas de especialización (período, región, temática)
- Un ejemplo de evento que te gustaría aportar

Te otorgaremos rol **CONTRIBUTOR** y podrás usar el formulario en `/contribuir`.

### 3. Envía un evento

El formulario de contribución se divide en 5 pasos:

1. **Información básica**: título, año, categoría, era histórica.
2. **Ubicación**: latitud/longitud (usar OpenStreetMap si no las conoces),
   región, comuna.
3. **Descripción**: 50-10.000 caracteres, lenguaje neutro y verificable.
4. **Fuentes**: mínimo 1 obligatoria. Idealmente 2 o más, citando
   Biblioteca Nacional de Chile, Memoria Chilena, Archivo Nacional, papers
   académicos o libros con ISBN.
5. **Revisar y enviar**: tu propuesta queda en estado *PENDING_REVIEW*.

Un curador revisa tu envío en máximo 7 días. Puede aprobarlo, pedir cambios o
rechazarlo (con motivo).

### 4. Reglas editoriales

- **Cita siempre fuentes verificables.** Sin fuente, no se publica.
- **Lenguaje neutro y respetuoso.** Especial cuidado con eventos que afectan
  a pueblos originarios, comunidades disidentes, víctimas de violencia
  política. Evita eufemismos y caricaturas.
- **No inventes.** Mejor decir "se desconoce la fecha exacta" que afirmar algo
  no documentado.
- **Coordenadas precisas.** Idealmente cercanas al lugar real del evento.
- **Atribuye todas las imágenes.** Si subes media, indica licencia y autor.

## Para contribuidores técnicos

### Setup

```bash
git clone https://github.com/lagusfaxx/clh.git
cd clh
pnpm install
cp .env.example .env  # editar
docker compose up -d
pnpm db:migrate:deploy
pnpm seed
pnpm dev
```

### Convenciones de código

- **TypeScript estricto.** No usar `any`.
- **Prettier + ESLint** configurados en root. Se ejecutan en CI.
- **Convenciones de imports**: paths absolutos `@/...` para `apps/web`.
- **Componentes UI** que sean reutilizables → `packages/ui/src/components/`.
- **APIs**: Validar input con Zod (`apps/web/src/lib/validators.ts`).
- **DB queries**: extender `packages/db/src/` para queries complejas en raw SQL.
- **Commits**: mensajes en imperativo, sin scope obligatorio.
  Ejemplo: `add filter by region in events API`.

### Tests

```bash
pnpm test           # unit (Vitest)
pnpm test:e2e       # e2e (Playwright)
```

- Toda nueva función pura en `lib/` debe tener test unitario.
- Toda nueva ruta API debe tener test integration o al menos un fixture E2E.
- No commitear sin que `pnpm type-check` pase limpio.

### Pull request

1. Fork del repo y branch desde `main`.
2. Commit con cambios atómicos.
3. Asegurarse que `pnpm lint`, `pnpm type-check` y `pnpm test` pasan.
4. Abrir PR con descripción clara: qué, por qué, cómo probar.
5. Esperar revisión. Iterar si es necesario.

### Reportar bugs

Usa GitHub Issues con la plantilla **Bug report**. Incluye:

- Pasos para reproducir
- Comportamiento esperado vs. actual
- Versión / entorno
- Screenshots si aplica

## Código de conducta

Tratamos a colaboradoras y colaboradores con respeto, independientemente de
identidad, orientación, nacionalidad, formación o experiencia. No se toleran
acoso ni discriminación. Reportes a `conducta@chilehistorico.cl`.
