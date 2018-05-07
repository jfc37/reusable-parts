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
