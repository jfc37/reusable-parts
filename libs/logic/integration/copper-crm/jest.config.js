module.exports = {
  name: 'logic-integration-copper-crm',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/logic/integration/copper-crm',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
