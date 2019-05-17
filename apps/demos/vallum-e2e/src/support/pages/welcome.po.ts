export class VallumWelcomePage {
  public static clickLoginButton(): void {
    cy.get('[data-test-id="login-button"]').click();
  }
}
