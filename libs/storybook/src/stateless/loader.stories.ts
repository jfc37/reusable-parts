import { storiesOf, moduleMetadata } from '@storybook/angular';
import { LoaderModule } from '@reusable-parts/stateless/loader';

storiesOf('Stateless Loader', module)
  .addDecorator(
    moduleMetadata({
      imports: [LoaderModule],
    }),
  )
  .add('in small container', () => ({
    template: `
    <div style="width: 100px; height: 100px; border-color: black; border-style: solid;">
      <stateless-loader></stateless-loader>
    </div>
    `,
  }))
  .add('in large container', () => ({
    template: `
    <div style="width: 600px; height: 600px; border-color: black; border-style: solid;">
      <stateless-loader></stateless-loader>
    </div>
    `,
  }));
