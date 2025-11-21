describe('Recipe Finder App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show app content', async () => {
    await expect(element(by.id('app-content'))).toBeVisible();
  });
});

