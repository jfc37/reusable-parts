export class VallumWelcomePage {
  public static clickLoginButton(): void {
    cy.get('[data-test-id="login-button"]').click();
  }
}

export class Auth0Hosted {
  public static login(email: string, password: string): void {
    cy.get('.auth0-lock-input-email > .auth0-lock-input-wrap > .auth0-lock-input').type(email);
    cy.get(
      '.auth0-lock-input-show-password > .auth0-lock-input-block > .auth0-lock-input-wrap > .auth0-lock-input',
    ).type(password);

    cy.get('.auth0-lock-submit').click();
  }
}

export class PageWithNavigationPage {
  public static logout(): void {
    cy.get('[data-test-id="user-menu-button"] img').click();
    cy.get('[data-test-id="log-out-button"]').click();
  }
}

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
