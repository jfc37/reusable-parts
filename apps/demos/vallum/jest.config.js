module.exports = {
  name: 'demos-vallum',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/demos/vallum/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
