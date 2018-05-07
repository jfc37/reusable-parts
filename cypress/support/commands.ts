const url = Cypress.env('baseUrl') || 'http://localhost:4200';

export function clearSession() {
  cy.visit(url, {
    onBeforeLoad: win => {
      win.sessionStorage.clear();
    },
  });
  cy.visit(url);
}

export function testId(id: string): string {
  return `[data-test-id="${id}"]`;
}

export function visit(path: string): void {
  cy.visit(url + '/' + path);
}

export function assertOnDashboard(): void {
  assertOnPage('dashboard');
}

export function assertOnLoginPage(): void {
  assertOnPage('login');
}

export function assertOnRegisterPage(): void {
  assertOnPage('register');
}

function assertOnPage(path: string): void {
  cy.url().should('contain', path);
}

export function loginAsAdmin() {
  const container = cy.get(testId('login-page'));

  const email = container.get(testId('email-input'));
  email.type('admin@email.com');

  const password = container.get(testId('password-input'));
  password.type('password');

  const loginButton = container.get(testId('login-button'));
  loginButton.click();

  assertOnDashboard();
}
