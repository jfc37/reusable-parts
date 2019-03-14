module.exports = {
  name: 'stateless-layouts-header',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/layouts/header',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
