import { CircleCheckBig, CircleDollarSign, CirclePercent } from 'lucide-react';
import type { getTranslations } from 'next-intl/server';
import type { THowToGetMoney, TLaunchpadStep } from './types';

type TTranslations = Awaited<ReturnType<typeof getTranslations>>;

export const launchpadStepData = (t: TTranslations): TLaunchpadStep[] => [
  {
    step: 1,
    title: t('stepSection.step.stepOne.title'),
    listDesc: [
      t('stepSection.step.stepOne.descOne'),
      t('stepSection.step.stepOne.descTwo'),
      t('stepSection.step.stepOne.descThree'),
      t('stepSection.step.stepOne.descFour'),
    ],
  },
  {
    step: 2,
    title: t('stepSection.step.stepTwo.title'),
    listDesc: [t('stepSection.step.stepTwo.descOne'), t('stepSection.step.stepTwo.descTwo')],
  },
  {
    step: 3,
    title: t('stepSection.step.stepThree.title'),
    listDesc: [t('stepSection.step.stepThree.descOne'), t('stepSection.step.stepThree.descTwo')],
  },
  {
    step: 4,
    title: t('stepSection.step.stepFour.title'),
    listDesc: [t('stepSection.step.stepFour.descOne'), t('stepSection.step.stepFour.descTwo')],
  },
];

export const howToGetMoneyData = (t: TTranslations): THowToGetMoney[] => [
  {
    title: t('howToSection.step.stepOne.title'),
    icon: CircleDollarSign,
    listDesc: [
      t('howToSection.step.stepOne.descOne'),
      t('howToSection.step.stepOne.descTwo'),
      t('howToSection.step.stepOne.descThree'),
    ],
  },
  {
    title: t('howToSection.step.stepTwo.title'),
    icon: CircleCheckBig,
    listDesc: [
      t('howToSection.step.stepTwo.descOne'),
      t('howToSection.step.stepTwo.descTwo'),
      t('howToSection.step.stepTwo.descThree'),
    ],
  },
  {
    title: t('howToSection.step.stepThree.title'),
    icon: CirclePercent,
    listDesc: [t('howToSection.step.stepThree.descOne'), t('howToSection.step.stepThree.descTwo')],
  },
];
