import { createSection } from '../../../_utils/function';

export const createAiEduRankingConfig = (getThemeTranslation: (path: string[]) => string) => ({
  aieduDashboard: createSection<'ranking', 'aieduDashboard'>({
    props: {
      title: getThemeTranslation(['ranking', 'aieduDashboard', 'title']),
    },
    order: 0,
  }),
});
