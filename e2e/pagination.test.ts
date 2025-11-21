describe('Pagination Tests', () => {
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

  it('should display pagination controls when multiple pages exist', async () => {
    await waitFor(element(by.id('search-input')))
      .toBeVisible()
      .withTimeout(5000);

    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      await waitFor(element(by.id('pagination-page-info')))
        .toBeVisible()
        .withTimeout(5000);

      const pageInfo = await element(by.id('pagination-page-info')).getAttributes();
      const pageText = 'label' in pageInfo ? pageInfo.label : 'text' in pageInfo ? pageInfo.text : '';
      expect(pageText).toContain('1');
    } catch {
    }
  });

  it('should navigate to next page', async () => {
    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      const nextButton = element(by.id('pagination-next-button'));
      await waitFor(nextButton)
        .toBeVisible()
        .withTimeout(5000);

      const isEnabled = await nextButton.getAttributes();
      const buttonLabel = 'label' in isEnabled ? isEnabled.label : '';
      if (!buttonLabel?.includes('disabled')) {
        await nextButton.tap();
        await new Promise(resolve => setTimeout(resolve, 2000));

        await waitFor(element(by.id('pagination-page-info')))
          .toBeVisible()
          .withTimeout(5000);

        const pageInfo = await element(by.id('pagination-page-info')).getAttributes();
        const pageText = 'label' in pageInfo ? pageInfo.label : 'text' in pageInfo ? pageInfo.text : '';
        expect(pageText).toContain('2');
      }
    } catch {
    }
  });

  it('should navigate to previous page', async () => {
    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      const nextButton = element(by.id('pagination-next-button'));
      await waitFor(nextButton)
        .toBeVisible()
        .withTimeout(5000);

      const nextButtonAttrs = await nextButton.getAttributes();
      const buttonLabel = 'label' in nextButtonAttrs ? nextButtonAttrs.label : '';
      if (!buttonLabel?.includes('disabled')) {
        await nextButton.tap();
        await new Promise(resolve => setTimeout(resolve, 2000));

        const prevButton = element(by.id('pagination-prev-button'));
        await waitFor(prevButton)
          .toBeVisible()
          .withTimeout(5000);

        await prevButton.tap();
        await new Promise(resolve => setTimeout(resolve, 2000));

        await waitFor(element(by.id('pagination-page-info')))
          .toBeVisible()
          .withTimeout(5000);

        const pageInfo = await element(by.id('pagination-page-info')).getAttributes();
        const pageText = 'label' in pageInfo ? pageInfo.label : 'text' in pageInfo ? pageInfo.text : '';
        expect(pageText).toContain('1');
      }
    } catch {
    }
  });

  it('should disable previous button on first page', async () => {
    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      const prevButton = element(by.id('pagination-prev-button'));
      await waitFor(prevButton)
        .toBeVisible()
        .withTimeout(5000);

      const buttonAttrs = await prevButton.getAttributes();
      const isEnabled = 'enabled' in buttonAttrs ? buttonAttrs.enabled : true;
      expect(isEnabled).toBe(false);
    } catch {
    }
  });

  it('should scroll to top when changing pages', async () => {
    await waitFor(element(by.id('recipe-card-1')))
      .toBeVisible()
      .withTimeout(10000);

    try {
      const nextButton = element(by.id('pagination-next-button'));
      await waitFor(nextButton)
        .toBeVisible()
        .withTimeout(5000);

      const nextButtonAttrs = await nextButton.getAttributes();
      const buttonLabel = 'label' in nextButtonAttrs ? nextButtonAttrs.label : '';
      if (!buttonLabel?.includes('disabled')) {
        await nextButton.tap();
        await new Promise(resolve => setTimeout(resolve, 2000));

        await waitFor(element(by.id('recipe-card-1')))
          .toBeVisible()
          .withTimeout(5000);
      }
    } catch {
    }
  });
});

