import { test, expect, Page } from '@playwright/test';

const demoCtaName = 'Schedule Demo';

async function resolveDestination(page: Page, popup: Page | null): Promise<Page> {
  const target = popup ?? page;
  await target.waitForLoadState('domcontentloaded');
  return target;
}

test.describe('Homepage — Schedule Demo flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Schedule Demo CTA is visible and enabled', async ({ page }) => {
    const scheduleDemoCta = page.getByRole('link', { name: demoCtaName, exact: false }).first();
    await expect(scheduleDemoCta).toBeVisible();
    await expect(scheduleDemoCta).toBeEnabled();
  });

  test('clicking Schedule Demo opens a scheduling screen', async ({ page, context }) => {
    const scheduleDemoCta = page.getByRole('link', { name: demoCtaName, exact: false }).first();
    await expect(scheduleDemoCta).toBeVisible();

    const [popup] = await Promise.all([
      context.waitForEvent('page', { timeout: 5_000 }).catch(() => null),
      scheduleDemoCta.click(),
    ]);

    const destination = await resolveDestination(page, popup);

    // Outcome A: navigated to a dedicated demo/scheduling URL.
    const navigatedToDemoUrl = /demo|calendly|schedule|meeting/i.test(destination.url());

    // Outcome B: stayed on the page but opened a modal/dialog instead.
    const modal = destination.getByRole('dialog');
    const modalVisible = await modal.first().isVisible().catch(() => false);

    expect(
      navigatedToDemoUrl || modalVisible,
      'Expected either a navigation to a demo/scheduling URL or a modal dialog to open'
    ).toBeTruthy();
  });

  test('scheduling surface exposes a way to actually book a slot', async ({ page, context }) => {
    const scheduleDemoCta = page.getByRole('link', { name: demoCtaName, exact: false }).first();

    const [popup] = await Promise.all([
      context.waitForEvent('page', { timeout: 5_000 }).catch(() => null),
      scheduleDemoCta.click(),
    ]);

    const destination = await resolveDestination(page, popup);
    await destination.waitForLoadState('networkidle').catch(() => {});

    // Common patterns for a booking surface: an embedded scheduler
    // (Calendly/HubSpot iframe) or a lead-capture form.
    const schedulerIframe = destination.locator(
      'iframe[src*="calendly" i], iframe[src*="hubspot" i], iframe[title*="schedul" i]'
    );
    const bookingForm = destination.locator('form');

    const hasIframe = (await schedulerIframe.count()) > 0;
    const hasForm = (await bookingForm.count()) > 0;

    expect(
      hasIframe || hasForm,
      'Expected either an embedded scheduling widget (iframe) or a booking form'
    ).toBeTruthy();
  });
});