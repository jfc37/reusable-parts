module.exports = {
  name: 'stateless-layouts-layout-with-nav',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/layouts/layout-with-nav',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
