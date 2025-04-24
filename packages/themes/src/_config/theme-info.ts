import AcademiaThumbnail from '@oe/assets/images/theme/thumbnail/academia.png';
import AieduThumbnail from '@oe/assets/images/theme/thumbnail/aiedu.png';
import AvailThumbnail from '@oe/assets/images/theme/thumbnail/avail.png';
import FenetThumbnail from '@oe/assets/images/theme/thumbnail/fenet.png';
import ScholarThumbnail from '@oe/assets/images/theme/thumbnail/scholar.png';
import VbiThumbnail from '@oe/assets/images/theme/thumbnail/vbi.png';

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
    fenet: {
      name: t('themeInfo.fenet.name'),
      description: t('themeInfo.fenet.description'),
      thumbnail: undefined,
      creator: t('themeInfo.fenet.creator'),
    },
    // Theme step 15.1 (optional): add the describe for the theme
    aiedu: {
      name: t('themeInfo.aiedu.name'),
      description: t('themeInfo.aiedu.description'),
      thumbnail: undefined,
      creator: t('themeInfo.aiedu.creator'),
    },
  };
};

export const themeInfoThumbnail = {
  avail: AvailThumbnail,
  vbi: VbiThumbnail,
  academia: AcademiaThumbnail,
  scholar: ScholarThumbnail,
  fenet: FenetThumbnail,
  // Theme step 15.2 (optional): add the thumbnail
  aiedu: AieduThumbnail,
};
