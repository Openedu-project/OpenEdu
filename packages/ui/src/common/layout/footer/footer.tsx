import Discord from '@oe/assets/icons/social-icon/discord';
import Facebook from '@oe/assets/icons/social-icon/facebook';
import Telegram from '@oe/assets/icons/social-icon/telegram';
import OpeneduLogo from '@oe/assets/images/logo-openedu-2.png';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';

export function Footer() {
  const t = useTranslations('footer');

  const navigationLinks = useMemo(
    () => ({
      registration: [
        {
          href: '/become-creator',
          label: t('navigation.registration.becomeEducators'),
        },
        {
          href: '/become-writer',
          label: t('navigation.registration.becomeLearners'),
        },
        {
          href: '/organization',
          label: t('navigation.registration.becomeOrganizations'),
        },
      ],
      terms: [
        { href: '/terms', label: t('navigation.terms.tnc') },
        { href: '/faq', label: t('navigation.terms.faq') },
      ],
      social: [
        {
          href: 'https://discord.com/invite/hWq4TXEDxW',
          icon: Discord,
          label: t('navigation.social.discord'),
        },
        {
          href: 'https://t.me/+z2s3BWk8jZhkNzY1',
          icon: Telegram,
          label: t('navigation.social.telegram'),
        },
        {
          href: 'https://www.facebook.com/openedu101',
          icon: Facebook,
          label: t('navigation.social.facebook'),
        },
      ],
    }),
    [t]
  );

  const LogoSection = useMemo(
    () => (
      <div className="w-full lg:col-span-4">
        <Link href="/" className="mb-6 flex items-center gap-2 border-none p-0">
          <div className="mr-auto w-[115px] md:w-[172px]">
            <Image src={OpeneduLogo.src} alt="OpenEdu" align="start" width={172} height={40} />
          </div>
        </Link>

        <div className="mcaption-regular16 max-w-sm">
          {t.rich('description', {
            emphasis: chunks => <span className="text-primary">{chunks}</span>,
            break: () => <br />,
          })}
        </div>
      </div>
    ),
    [t]
  );

  const NavigationSection = useMemo(
    () => (
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-8">
        <div className="lg:col-span-3">
          <h3 className="mbutton-semibold16 mb-4">{t('navigation.registration.title')}</h3>
          <ul className="space-y-1">
            {navigationLinks.registration.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mcaption-regular16 p-0 text-[#464646] transition-colors hover:text-[#2B3674]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mbutton-semibold16 mb-4">{t('navigation.terms.title')}</h3>
          <ul className="space-y-1">
            {navigationLinks.terms.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mcaption-regular16 p-0 text-[#464646] transition-colors hover:text-[#2B3674]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <ul className="space-y-1">
            {navigationLinks.social.map(link => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mcaption-regular16 flex items-center justify-start gap-3 p-0 text-[#464646] transition-colors hover:text-[#2B3674]"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    ),
    [navigationLinks, t]
  );

  return (
    <footer className="w-full bg-[linear-gradient(255deg,_#B8F4F8_6.18%,_#EDE3FE_70.53%)] px-4 py-8 lg:py-16">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
          {LogoSection}
          {NavigationSection}
        </div>
      </div>
    </footer>
  );
}
