import {
  clearSession,
  testId,
  assertOnDashboard,
  assertOnLoginPage,
} from '../support/commands';

describe('Login', () => {
  beforeEach(() => {
    clearSession();
  });

  it(`Basic successful log in`, () => {
    const container = cy.get(testId('login-page'));

    const email = container.get(testId('email-input'));
    email.type('admin@email.com');

    const password = container.get(testId('password-input'));
    password.type('password');

    const loginButton = container.get(testId('login-button'));
    loginButton.click();

    assertOnDashboard();
  });

  it(`Failed log in`, () => {
    const container = cy.get(testId('login-page'));

    const email = container.get(testId('email-input'));
    email.type('wrong@email.com');

    const password = container.get(testId('password-input'));
    password.type('password');

    const loginButton = container.get(testId('login-button'));
    loginButton.click();

    const errorMessage = container.get(testId('login-error-message'));
    assertOnLoginPage();
  });
});
