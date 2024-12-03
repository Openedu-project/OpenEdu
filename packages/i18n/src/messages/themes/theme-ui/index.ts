import { themeUIColor } from './color';
import { themeUIFonts } from './font';
import { themeUIRadius } from './radius';

export const ThemeUIMessage = {
  themeUI: {
    ...themeUIColor,
    ...themeUIRadius,
    ...themeUIFonts,
  },
};
