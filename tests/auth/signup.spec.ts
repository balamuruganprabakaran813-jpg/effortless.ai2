import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Effortless AI Home Page', () => {

    test('Verify all header modules are clickable', async ({ page }) => {

        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.verifyHeaderModulesClickable();

    });

    test('Verify Login button opens Login screen', async ({ page }) => {

        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        const destinationPage = await homePage.clickLogin();
        const loginPage = new LoginPage(destinationPage);

        await loginPage.verifyLoginScreenReached();

    });

    test('Verify user can click Schedule Demo and reach a scheduling screen', async ({ page }) => {

        const homePage = new HomePage(page);

        await homePage.navigateToHomePage();
        const destinationPage = await homePage.clickScheduleDemo();

        
        await destinationPage.waitForLoadState('domcontentloaded').catch(() => {});
        await destinationPage.waitForTimeout(5000);

        const urlMatches = /schedule|demo|calendly|meeting/i.test(destinationPage.url());
        const schedulerIframe = destinationPage.locator(
            'iframe[src*="calendly" i], iframe[src*="hubspot" i], iframe[title*="schedul" i]'
        );
        const bookingForm = destinationPage.locator('form');

        const hasIframe = (await schedulerIframe.count()) > 0;
        const hasForm = (await bookingForm.count()) > 0;

        expect(
            urlMatches || hasIframe || hasForm,
            'Expected a demo/schedule URL, an embedded scheduler, or a booking form'
        ).toBeTruthy();

    });

});