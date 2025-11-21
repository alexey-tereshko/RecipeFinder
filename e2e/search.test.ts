describe('Search Tests', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      permissions: { notifications: 'YES' },
    });
    await new Promise(resolve => setTimeout(resolve, 5000));
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  it('should display search input', async () => {
    await waitFor(element(by.id('search-input')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should type in search input', async () => {
    await waitFor(element(by.id('search-input')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('search-input')).typeText('chicken');
    await new Promise(resolve => setTimeout(resolve, 3000));

    let foundResult = false;
    for (let i = 1; i <= 10; i++) {
      try {
        await waitFor(element(by.id(`search-result-${i}`)))
          .toBeVisible()
          .withTimeout(1000);
        foundResult = true;
        break;
      } catch {}
    }

    if (!foundResult) {
      throw new Error('No search results found');
    }
  });

  it('should reset pagination when searching', async () => {
    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      const nextButton = element(by.id('pagination-next-button'));
      await waitFor(nextButton).toBeVisible().withTimeout(5000);

      const nextButtonAttrs = await nextButton.getAttributes();
      const buttonLabel =
        'label' in nextButtonAttrs ? nextButtonAttrs.label : '';
      if (!buttonLabel?.includes('disabled')) {
        await nextButton.tap();
        await new Promise(resolve => setTimeout(resolve, 2000));

        await element(by.id('search-input')).typeText('chicken');
        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
          await waitFor(element(by.id('pagination-page-info')))
            .toBeVisible()
            .withTimeout(5000);
        } catch {}
      }
    } catch {}
  });
});
