module.exports = {
  name: 'stateless-layouts-page-with-nav',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/layouts/page-with-nav',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
