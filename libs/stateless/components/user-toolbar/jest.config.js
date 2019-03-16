module.exports = {
  name: 'stateless-user-toolbar',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/components/user-toolbar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
