describe('Recipe Finder App', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' },
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show app content', async () => {
    await waitFor(element(by.id('app-content')))
      .toBeVisible()
      .withTimeout(10000);
  });
});

