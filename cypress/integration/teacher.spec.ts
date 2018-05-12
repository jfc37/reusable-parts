import { clearSession, testId, assertOnDashboard, assertOnLoginPage, loginAsAdmin } from '../support/commands';

describe('Teacher Page', () => {
  beforeEach(() => {
    clearSession();
    loginAsAdmin();

    const sideNav = cy.get(testId('side-nav'));
    const adminMenu = sideNav.contains('Admin');
    adminMenu.click();

    const refreshedSideNav = cy.get(testId('side-nav'));
    const teacherMenu = refreshedSideNav.contains('Teachers');
    teacherMenu.click();
  });

  it(`Add / Remove teacher`, () => {
    const container = cy.get(testId('teachers-page'));
    const teacherRow = container.find(testId('Teacher Person-row'));
    const removeButton = teacherRow.find(testId('remove-teacher-button'));
    removeButton.click();

    cy.get(testId('Teacher Person-row')).should('not.exist');

    const refreshedContainer = cy.get(testId('teachers-page'));
    const addNewTecher = refreshedContainer.find(testId('new-teacher-input'));
    addNewTecher.type('Teacher Person');
    addNewTecher.type('{downarrow}');
    addNewTecher.type('{enter}');
    addNewTecher.type('{enter}');

    cy.get(testId('Teacher Person-row')).should('exist');
  });
});
