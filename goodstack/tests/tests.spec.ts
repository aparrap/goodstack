import { expect, test } from '@playwright/test'
import { Page } from 'playwright'
import { Logger } from '@playwright/test'
import { GoodstackPage } from '../pages/base.page'

test.describe('Navigation Bar', () => {
  test(`Navigate to Donations page`, async ({ page }) => {
    let stamp = Date.now()                                                      // Adding timestamp so screenshot is not overwritten every run
    let homePage = new GoodstackPage(page)
    await homePage.visit()

    await page.getByRole('button', { name: 'Products Arrow down' }).click()     // Updated locator for the one suggested by Playwright  
    await Promise.all([                                                         // Just to make sure the images endpoint work on donations when Donation navbar is clicked
      page.waitForResponse(resp => 
        resp.url().includes('https://goodstack.io/_next/image') && resp.status() === 200),
      page.getByRole('menuitem', { name: 'Donations' }).click()
    ])

    await expect(page.getByRole('heading', { name: 'Track and manage everything' })).toBeVisible()   // Update on how assertions are better written in playwright without having unnecesary assignations
    await expect(page.getByRole('img', { name: 'Donations hero' })).toBeVisible()

    await page.screenshot({ path: 'screenshot_'+stamp+'.png', fullPage: true })
  })
})
