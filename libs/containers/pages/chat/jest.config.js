module.exports = {
  name: 'containers-pages-chat',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/containers/pages/chat',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
