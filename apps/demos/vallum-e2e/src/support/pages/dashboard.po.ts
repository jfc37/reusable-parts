export class VallumDashboardPage {
  public static searchForUser(name: string): void {
    cy.get('[data-test-id="user-search-input"]').type(name);
  }

  public static clickOnFirstRow(): void {
    cy.get('[data-test-id="user-search-row"]')
      .first()
      .click();
  }

  public static clickCancelOnDialog(): void {
    cy.get('[data-test-id="cancel-button"]').click();
  }

  public static clickConfirmOnDialog(): void {
    cy.get('[data-test-id="confirm-button"]').click();
  }
}
