import { clearSession, testId, assertOnDashboard, assertOnRegisterPage } from '../support/commands';

describe('Register new account', () => {
  beforeEach(() => {
    clearSession();
    cy.get(testId('register-link')).click();
  });

  it(`Basic successful registration`, () => {
    const guid = String(Math.floor(Math.random() * 9999));
    const container = cy.get(testId('register-page'));

    const firstName = container.get(testId('first-name-input'));
    firstName.type('E2E User');

    const surname = container.get(testId('surname-input'));
    surname.type(guid);

    const email = container.get(testId('email-input'));
    email.type('e2e-' + guid + '@email.com');

    const password = container.get(testId('password-input'));
    password.type('password');

    const confirmPassword = container.get(testId('confirm-password-input'));
    confirmPassword.type('password');

    const termsAndConditions = container.get(testId('terms-and-conditions-checkbox'));
    termsAndConditions.click();

    const createAccountButton = container.get(testId('create-account-button'));
    createAccountButton.click();

    assertOnDashboard();
  });

  it(`Failed registration`, () => {
    const guid = String(Math.floor(Math.random() * 1000));
    const container = cy.get(testId('register-page'));

    const firstName = container.get(testId('first-name-input'));
    firstName.type('E2E User');

    const surname = container.get(testId('surname-input'));
    surname.type(guid);

    const email = container.get(testId('email-input'));
    email.type('admin@email.com');

    const password = container.get(testId('password-input'));
    password.type('password');

    const confirmPassword = container.get(testId('confirm-password-input'));
    confirmPassword.type('password');

    const termsAndConditions = container.get(testId('terms-and-conditions-checkbox'));
    termsAndConditions.click();

    const createAccountButton = container.get(testId('create-account-button'));
    createAccountButton.click();

    const errorMessage = container.get(testId('registration-error-message'));
    assertOnRegisterPage();
  });
});
