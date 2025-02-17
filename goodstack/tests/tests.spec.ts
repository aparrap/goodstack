import { expect, test } from '@playwright/test'
import { Page } from 'playwright'
import { Logger } from '@playwright/test'
import { GoodstackPage } from '../pages/base.page'

test.describe('Navigation Bar', () => {
  test(`Navigate to Donations page`, async ({ page }) => {
    let stamp = Date.now()
    let homePage = new GoodstackPage(page)
    await homePage.visit()

    await page.getByRole('button', { name: 'Products Arrow down' }).click()
    await Promise.all([
      page.waitForResponse(resp => 
        resp.url().includes('https://goodstack.io/_next/image') && resp.status() === 200),
      page.getByRole('menuitem', { name: 'Donations' }).click()
    ])

    await expect(page.getByRole('heading', { name: 'Track and manage everything' })).toBeVisible()
    await expect(page.getByRole('img', { name: 'Donations hero' })).toBeVisible()

    await page.screenshot({ path: 'screenshot_'+stamp+'.png', fullPage: true })
  })
})
