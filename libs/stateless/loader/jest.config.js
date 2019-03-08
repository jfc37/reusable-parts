module.exports = {
  name: 'stateless-loader',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stateless/loader',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
