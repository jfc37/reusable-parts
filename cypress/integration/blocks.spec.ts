import { clearSession, testId, assertOnDashboard, assertOnLoginPage, loginAsAdmin } from '../support/commands';

describe('Blocks Page', () => {
  beforeEach(() => {
    clearSession();
    loginAsAdmin();

    const sideNav = cy.get(testId('side-nav'));
    const adminMenu = sideNav.contains('Admin');
    adminMenu.click();

    const refreshedSideNav = cy.get(testId('side-nav'));
    const blockMenu = refreshedSideNav.contains('Blocks');
    blockMenu.click();
  });

  it(`Block interaction`, () => {
    clickNewButton();
    const blockName = createNewBlock();

    generateBlock(blockName);
    deleteBlocks(blockName);
  });
});

function clickNewButton() {
  const container = cy.get(testId('view-blocks-page'), { timeout: 10000 });
  container.find(testId('new-block-button')).click();
}

function createNewBlock(): string {
  const guid = String(Math.floor(Math.random() * 1000));
  const blockName = 'E2E Block ' + guid;

  cy.get(testId('block-name')).type(blockName);
  cy.get('.mat-datepicker-toggle-default-icon').click();
  cy.get('.mat-calendar-body-active > .mat-calendar-body-cell-content').click();
  cy.get(testId('start-time')).type('19:15');
  cy.get(testId('class-length')).type('60');
  cy.get(testId('number-of-classes')).type('4');
  cy.get(testId('class-capacity')).type('30');
  cy.get(testId('teacher')).click();
  cy.get('#mat-option-1').click();

  cy.get(testId('save-block-button')).click();

  return blockName;
}

function generateBlock(blockName: string) {
  const row = cy.get(testId(blockName + '-row'));
  row.find(testId('generate-block-button')).click();

  const rows = cy.get(testId(blockName + '-row'));
  rows.should($lis => expect($lis).to.have.length(2));
}

function deleteBlocks(blockName: string) {
  cy
    .get(testId(blockName + '-row'))
    .find(testId('remove-block-button'))
    .first()
    .click();

  cy.get(testId(blockName + '-row')).should($lis => expect($lis).to.have.length(1));

  cy
    .get(testId(blockName + '-row'))
    .find(testId('remove-block-button'))
    .click();

  cy.get(testId(blockName + '-row')).should('not.exist');
}
