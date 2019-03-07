module.exports = {
  name: 'stateless-welcome',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stateless/welcome',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
