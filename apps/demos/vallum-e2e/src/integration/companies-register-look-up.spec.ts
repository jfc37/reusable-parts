import { UserToolbar } from '../support/pages/user-toolbar.po';
import { VallumWelcomePage } from '../support/pages/welcome.po';
import { HostedAuth0 } from '../support/pages/hosted-auth0.po';
import { VallumDashboardPage } from '../support/pages/dashboard.po';

const viewPorts = [
  { name: 'iPhone 5', viewport: 'iphone-5' },
  { name: 'iPhone 6', viewport: 'iphone-6' },
  { name: 'macbook 11', viewport: 'macbook-11' },
  { name: 'macbook 15', viewport: 'macbook-15' },
];

describe('Companies register look up', () => {
  describe('search companies register and update user in Copper CRM', () => {
    afterEach(() => UserToolbar.logout());

    viewPorts.forEach(viewPort => {
      it(viewPort.name, () => {
        cy.viewport(viewPort.viewport as Cypress.ViewportPreset);
        cy.visit('/');

        VallumWelcomePage.clickLoginButton();
        HostedAuth0.login('adam@ladders.com', 'password');
        VallumDashboardPage.searchForUser('adam');
        VallumDashboardPage.clickOnFirstRow();
        VallumDashboardPage.clickCancelOnDialog();
      });
    });
  });
});
