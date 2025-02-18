import { expect, test } from '@playwright/test'

test.describe('Sauce demo Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
        await page.locator('[data-test="username"]').fill('standard_user')
        await page.locator('[data-test="password"]').fill('secret_sauce')
        await page.locator('[data-test="login-button"]').click()
    })
    
    test('Add products to cart', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeVisible()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1')
    })

    test('Check product details', async ({ page }) => {
        await page.locator('[data-test="item-4-title-link"]').click()
        await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible()
        await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible()
    })
})
