export class UserToolbar {
  public static logout(): void {
    cy.get('[data-test-id="user-menu-button"] img').click();
    cy.get('[data-test-id="log-out-button"]').click();
  }
}
