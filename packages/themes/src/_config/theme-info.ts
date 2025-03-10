export const themeInfo = (t: (key: string) => string) => {
  return {
    academia: {
      name: t('themeInfo.academia.name'),
      description: t('themeInfo.academia.description'),
      thumbnail: undefined,
      creator: t('themeInfo.academia.creator'),
    },
    scholar: {
      name: t('themeInfo.scholar.name'),
      description: t('themeInfo.scholar.description'),
      thumbnail: undefined,
      creator: t('themeInfo.scholar.creator'),
    },
    avail: {
      name: t('themeInfo.avail.name'),
      description: t('themeInfo.avail.description'),
      thumbnail: undefined,
      creator: t('themeInfo.avail.creator'),
    },
    vbi: {
      name: t('themeInfo.vbi.name'),
      description: t('themeInfo.vbi.description'),
      thumbnail: undefined,
      creator: t('themeInfo.vbi.creator'),
    },
  };
};
