module.exports = {
  name: 'stateless-pages-forgot-password',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/pages/forgot-password',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
