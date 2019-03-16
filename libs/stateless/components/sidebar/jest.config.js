module.exports = {
  name: 'stateless-sidebar',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stateless/components/sidebar',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
