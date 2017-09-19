import { DifferencesWebClientPage } from './app.po';

describe('differences-web-client App', function() {
  let page: DifferencesWebClientPage;

  beforeEach(() => {
    page = new DifferencesWebClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
