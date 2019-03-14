module.exports = {
  name: 'stateless-layouts-page',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/layouts/page',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
