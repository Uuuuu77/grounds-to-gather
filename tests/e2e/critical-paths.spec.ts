import { test, expect } from '@playwright/test'

test('product route and subscription flow are reachable', async ({ page }) => {
  await page.goto('/shop')
  await page.getByRole('link', { name: /Gathinja Medium Roast/i }).click()
  await expect(page).toHaveURL(/\/shop\/gathinja-medium-roast/)
  await page.goto('/subscriptions')
  await expect(page.getByRole('heading', { name: /Choose your rhythm now/i })).toBeVisible()
  await page.getByLabel('Bi-monthly').check()
  await page.getByLabel('Name').fill('Ebe')
  await page.getByLabel('Phone').fill('0708997089')
  await page.getByLabel('Email').fill('ebe@example.com')
  await page.getByRole('button', { name: 'Add subscription to cart' }).click()
  await expect(page.getByText('Added to cart.')).toBeVisible()
})

test('theme preference persists after reload', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Switch to dark mode/i }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
})
