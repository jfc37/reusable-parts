module.exports = {
  name: 'logic-integration-aws-file-upload',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/logic/integration/aws-file-upload',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
