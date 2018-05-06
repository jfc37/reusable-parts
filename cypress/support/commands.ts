const url = 'http://localhost:4200';

export function clearSession() {
  cy.visit(url, {
    onBeforeLoad: win => {
      win.sessionStorage.clear();
    },
  });
}

export function testId(id: string): string {
  return `[data-test-id="${id}"]`;
}

export function visit(path: string): void {
  cy.visit(url + '/' + path);
}

export function assertOnDashboard(): void {
  cy.url().should('contain', 'dashboard');
}
