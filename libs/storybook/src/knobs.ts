import { select } from '@storybook/addon-knobs';
import { Theme } from '@reusable-parts/stateless/theme';

export function getThemeKnob() {
  return select(
    'type',
    {
      [Theme.BlueLight]: Theme.BlueLight,
      [Theme.YellowLight]: Theme.YellowLight,
      [Theme.BlueGreyDark]: Theme.BlueGreyDark,
      [Theme.PinkDark]: Theme.PinkDark,
    },
    Theme.BlueLight,
  );
}
