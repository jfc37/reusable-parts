describe('Login', function() {
  it('Landing on the login screen', function() {
    cy.visit('http://localhost:4200');

    const container = cy.get('[data-test-id="login-page"]');
    container.find('[data-test-id="login-button"]');
  });
});
