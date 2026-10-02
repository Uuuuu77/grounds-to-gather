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

test('customer can add a product to the cart', async ({ page }) => {
  await page.goto('/shop/gathinja-medium-roast')
  await page.getByRole('button', { name: /Add to cart/i }).click()
  await expect(page.getByRole('button', { name: /Added/i })).toBeDisabled()
  await page.goto('/cart')
  await expect(page.getByText('Gathinja Medium Roast')).toBeVisible()
})

test('inquiry form builds a WhatsApp handoff', async ({ page }) => {
  await page.goto('/contact')
  await page.getByLabel('Name').fill('Ebe')
  await page.getByLabel('Phone or email').fill('ebe@example.com')
  await page.getByLabel('Message').fill('Order question')
  const popup = page.waitForEvent('popup')
  await page.getByRole('button', { name: /Send inquiry/i }).click()
  await expect(await popup).toHaveURL(/wa\.me\/254708997089\?text=/)
})

test('theme preference persists after reload', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Switch to dark mode/i }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator('html')).toHaveClass(/dark/)
})
