module.exports = {
  name: 'stateless-components-hero-text',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/stateless/components/hero-text',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
