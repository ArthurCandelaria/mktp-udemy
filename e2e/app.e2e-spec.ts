import { App2Page } from './app.po';

describe('app2 App', () => {
  let page: App2Page;

  beforeEach(() => {
    page = new App2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to xyz!!');
  });
});
