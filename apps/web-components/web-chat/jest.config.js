module.exports = {
  name: 'web-chat',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/web-components/web-chat/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
