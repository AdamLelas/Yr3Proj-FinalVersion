import { Jamiesprojv2Page } from './app.po';

describe('jamiesprojv2 App', () => {
  let page: Jamiesprojv2Page;

  beforeEach(() => {
    page = new Jamiesprojv2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
