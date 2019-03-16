module.exports = {
  name: 'stateless-pages-register',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/pages/register',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
