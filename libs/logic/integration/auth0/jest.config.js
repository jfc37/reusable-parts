module.exports = {
  name: 'logic-integration-auth0',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/logic/integration/auth0',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
