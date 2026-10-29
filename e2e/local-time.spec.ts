import { expect, test } from '@playwright/test';

// The showcase fixture kicks off at 16:30 UTC; the server runs in UTC too.
for (const { timezoneId, kickoff } of [
  { timezoneId: 'America/New_York', kickoff: '12:30' },
  { timezoneId: 'Asia/Tokyo', kickoff: '01:30' },
]) {
  test.describe(timezoneId, () => {
    test.use({ timezoneId });

    test('formats server-rendered times in the visitor zone without hydration errors', async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => {
        if (
          message.type() === 'error' &&
          /hydrat|Minified React error/i.test(message.text())
        ) {
          errors.push(message.text());
        }
      });

      // Time formatting must not depend on the showcase's external crest images.
      await page.route('**/_next/image?*', (route) => route.abort());
      await page.route('https://crests.football-data.org/**', (route) =>
        route.abort(),
      );
      await page.goto('/dev/kit', { waitUntil: 'domcontentloaded' });
      // Checked state arrives after hydration; don't assert the script's text too early.
      await expect(page.getByRole('radio', { name: 'Системная' })).toBeChecked();
      const times = page.locator('time[datetime="2026-10-24T16:30:00Z"]');
      await expect(times).toHaveCount(4);
      for (const time of await times.all()) {
        await expect(time).toHaveText(kickoff);
      }
      expect(errors).toEqual([]);
    });
  });
}
