import {
  clearSession,
  testId,
  assertOnDashboard,
  assertOnLoginPage,
  loginAsAdmin,
  visit,
} from '../support/commands';

describe('Teacher Page', () => {
  beforeEach(() => {
    clearSession();
    loginAsAdmin();
    visit('app/admin/teachers');
  });

  it(`Add / Remove teacher`, () => {
    visit('app/admin/teachers');
    const container = cy.get(testId('teachers-page'));
    // const table = container.find(testId('view-teachers-table'), {
    //   timeout: 1200000,
    // });
    const table = container.find(testId('view-teachers-table'));

    const teacherRow = table.find(testId('Teacher Person-row'));
    const removeButton = teacherRow.find(testId('remove-teacher-button'));
    removeButton.click();

    const addNewTecher = container.find(testId('new-teacher-input'));
    addNewTecher.type('Teacher Person');
    addNewTecher.type('{downarrow}');
    addNewTecher.type('{enter}');
    addNewTecher.type('{enter}');
  });
});
