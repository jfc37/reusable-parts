import { clearSession, testId, assertOnDashboard, assertOnRegisterPage } from '../support/commands';

describe('Forgot password', () => {
  beforeEach(() => {
    clearSession();
    cy.get(testId('forgot-password-link')).click();
  });

  it(`Successful password reset`, () => {
    const container = cy.get(testId('forgot-password-page'));

    const email = container.get(testId('email-input'));
    email.type('random-email@email.com');

    const resetButton = container.get(testId('reset-button'));
    resetButton.click();

    cy.get(testId('reset-success-message'));
  });

  it(`Failed password reset`, () => {
    const container = cy.get(testId('forgot-password-page'));

    const email = container.get(testId('email-input'));
    email.type('random-email@email');

    const resetButton = container.get(testId('reset-button'));
    resetButton.click();

    cy.get(testId('reset-error-message'));
  });
});
