import { RunningLogPage } from './app.po';

describe('running-log App', () => {
  let page: RunningLogPage;

  beforeEach(() => {
    page = new RunningLogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
