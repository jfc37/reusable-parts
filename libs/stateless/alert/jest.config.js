module.exports = {
  name: 'stateless-alert',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stateless/alert',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
