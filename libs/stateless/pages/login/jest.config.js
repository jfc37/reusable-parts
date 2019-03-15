module.exports = {
  name: 'stateless-pages-login',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/pages/login',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
