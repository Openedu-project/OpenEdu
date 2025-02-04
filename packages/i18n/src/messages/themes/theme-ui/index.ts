import { themeUIColor } from './color';
import { themeUIFonts } from './font';
import { themeUIRadius } from './radius';

export const themeUIMessage = {
  themeUI: {
    ...themeUIColor,
    ...themeUIRadius,
    ...themeUIFonts,
  },
};
