module.exports = {
  name: 'logic-integration-nz-business',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/logic/integration/nz-business',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
