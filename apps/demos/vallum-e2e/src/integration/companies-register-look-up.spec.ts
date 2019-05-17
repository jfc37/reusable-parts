import { UserToolbar } from '../support/pages/user-toolbar.po';
import { VallumWelcomePage } from '../support/pages/welcome.po';
import { HostedAuth0 } from '../support/pages/hosted-auth0.po';
import { VallumDashboardPage } from '../support/pages/dashboard.po';

describe('Companies register look up', () => {
  beforeEach(() => cy.visit('/'));

  afterEach(() => UserToolbar.logout());

  it('search companies register and update user in Copper CRM', () => {
    VallumWelcomePage.clickLoginButton();
    HostedAuth0.login('adam@ladders.com', 'password');
    VallumDashboardPage.searchForUser('adam');
    VallumDashboardPage.clickOnFirstRow();
    VallumDashboardPage.clickCancelOnDialog();
  });
});
