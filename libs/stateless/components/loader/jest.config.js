module.exports = {
  name: 'stateless-loader',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stateless/components/loader',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
