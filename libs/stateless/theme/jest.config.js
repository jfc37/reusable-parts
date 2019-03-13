module.exports = {
  name: 'stateless-theme',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stateless/theme',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
