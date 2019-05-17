import { VallumWelcomePage, Auth0Hosted, PageWithNavigationPage, VallumDashboardPage } from '../support/login.po';

describe('Companies register look up', () => {
  beforeEach(() => cy.visit('/'));

  afterEach(() => PageWithNavigationPage.logout());

  it('search companies register and update user in Copper CRM', () => {
    VallumWelcomePage.clickLoginButton();
    Auth0Hosted.login('adam@ladders.com', 'password');
    VallumDashboardPage.searchForUser('adam');
    VallumDashboardPage.clickOnFirstRow();
    VallumDashboardPage.clickCancelOnDialog();
  });
});
