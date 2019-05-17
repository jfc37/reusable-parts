export class HostedAuth0 {
  public static login(email: string, password: string): void {
    cy.get('.auth0-lock-input-email > .auth0-lock-input-wrap > .auth0-lock-input').type(email);
    cy.get(
      '.auth0-lock-input-show-password > .auth0-lock-input-block > .auth0-lock-input-wrap > .auth0-lock-input',
    ).type(password);

    cy.get('.auth0-lock-submit').click();
  }
}
