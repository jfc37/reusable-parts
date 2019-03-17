module.exports = {
  name: 'containers-pages-auth0-login',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/containers/pages/auth0-login',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
