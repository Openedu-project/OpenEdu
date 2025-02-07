import { createSection } from '../../../_utils/function';

export const createVbiPartnersConfig = (getThemeTranslation: (path: string[]) => string) => ({
  vbiPartnerList: createSection<'partners', 'vbiPartnerList'>({
    props: {
      title: getThemeTranslation(['partners', 'vbiPartnerList', 'title']),
      titleSub: getThemeTranslation(['partners', 'vbiPartnerList', 'titleSub']),
    },
    order: 0,
  }),
});
