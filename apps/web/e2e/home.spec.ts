import { test, expect } from '@playwright/test'

test.describe('Home / mapa', () => {
  test('renderiza header y filtros', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Chile Histórico').first()).toBeVisible()
    await expect(page.getByText(/Filtros/i).first()).toBeVisible()
  })

  test('línea de tiempo se muestra con presets', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Línea de tiempo')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Independencia' })).toBeVisible()
  })

  test('navegación a /eventos funciona', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Catálogo/i }).first().click()
    await expect(page).toHaveURL(/\/eventos$/)
  })
})
