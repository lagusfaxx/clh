import { test, expect } from '@playwright/test'

test.describe('Detalle de evento', () => {
  test('cargar página /evento/fundacion-santiago-1541 (si seed corrió)', async ({ page }) => {
    const res = await page.goto('/evento/fundacion-santiago-1541')
    if (res?.status() === 404) test.skip()
    await expect(page.locator('h1')).toContainText(/Santiago/i)
    await expect(page.getByText('Fuentes')).toBeVisible()
  })
})

test.describe('API health', () => {
  test('health endpoint responde 200', async ({ request }) => {
    const r = await request.get('/api/health')
    expect(r.status()).toBe(200)
    const data = await r.json()
    expect(data.status).toBe('ok')
  })
})
