import { expect, test } from '@playwright/test'
import { Page } from 'playwright'
import { Logger } from '@playwright/test'
import { GoodstackPage } from '../pages/base.page'

test.describe('execute', () => {
  test(`test`, async ({ page }) => {
    let homePage = new GoodstackPage(page)
    await homePage.visit()

    await page.getByRole('button', { name: 'Products Arrow down' }).click()
    await page.getByRole('menuitem', { name: 'Donations' }).click()

    await expect(page.getByRole('heading', { name: 'Track and manage everything' })).toBeVisible()

    await page.screenshot({ path: 'screenshot.png' })
  })
})
