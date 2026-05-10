export function slugify(input: string): string {
  return input
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  const root = slugify(base)
  let candidate = root
  let i = 2
  while (await exists(candidate)) {
    candidate = `${root}-${i++}`
    if (i > 200) throw new Error('No se pudo generar slug único')
  }
  return candidate
}
