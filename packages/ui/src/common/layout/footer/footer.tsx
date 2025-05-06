import { Facebook, Linkedin, Twitter } from '@oe/assets';
import OpeneduLogo from '@oe/assets/images/logo-openedu-2.png';
import { YoutubeIcon } from 'lucide-react';

import { Separator } from '@radix-ui/react-select';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import type { FileType } from '#components/uploader';
import { cn } from '#utils/cn';
export interface NavigationLink {
  id: string;
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface NavigationItem {
  label?: string;
  colSpan?: number;
  items?: NavigationLink[];
}
export interface FooterProps {
  logo?: FileType;
  navigationItems?: Record<string, NavigationItem>;
  description?: string;
  className?: string;
  variant?: string; // root | org
}

export function Footer({ logo, navigationItems, description, className, variant = 'root' }: FooterProps) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const openEduNavigationItem = {
    registration: {
      label: t('navigation.registration.title'),
      colSpan: 3,
      items: [
        {
          id: 'become-educators',
          href: '#',
          label: t('navigation.registration.becomeEducators'),
        },
        {
          id: 'become-learners',
          href: '#',
          label: t('navigation.registration.becomeLearners'),
        },
        {
          id: 'become-organizations',
          href: '#',
          label: t('navigation.registration.becomeOrganizations'),
        },
      ],
    },
    terms: {
      label: t('navigation.terms.title'),
      colSpan: 3,
      items: [
        { id: 'tnc', href: '/terms', label: t('navigation.terms.tnc') },
        { id: 'faq', href: '#', label: t('navigation.terms.faq') },
      ],
    },
    social: {
      label: t('navigation.social.title'),
      colSpan: 2,
      items: [
        {
          id: 'facebook',
          href: 'https://www.facebook.com/OpenEduOfficial',
          icon: Facebook,
          label: t('navigation.social.facebook'),
        },
        {
          id: 'twitter',
          href: 'https://x.com/OpenEdu_HQ',
          icon: Twitter,
          label: t('navigation.social.twitter'),
        },
        {
          id: 'linkedin',
          href: 'https://www.linkedin.com/company/106319142/admin/dashboard/',
          icon: Linkedin,
          label: t('navigation.social.linkedin'),
        },
        {
          id: 'youtube',
          href: 'https://www.youtube.com/@OpenEdu_Official',
          icon: YoutubeIcon,
          label: t('navigation.social.youtube'),
        },
      ],
    },
  };

  return (
    <footer
      className={cn('w-full bg-footer-gradient px-4 py-8 lg:py-16', variant === 'org' && 'bg-primary', className)}
    >
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12">
          <div className="w-full lg:col-span-4">
            <Link href="/" className="mb-6 flex h-auto items-center gap-2 border-none p-0">
              <div className="mr-auto">
                {logo ? (
                  <Image
                    src={logo.url}
                    alt="Logo"
                    align="start"
                    // width={logo.width}
                    // height={logo.height}
                    fill
                    aspectRatio="1:1"
                    containerHeight="64px"
                    className="h-full w-full"
                  />
                ) : (
                  <Image
                    src={OpeneduLogo.src}
                    alt="OpenEdu"
                    align="start"
                    width={172}
                    height={40}
                    className="w-[115px] min-w-[115px] md:w-[172px]"
                  />
                )}
              </div>
            </Link>

            <div className={cn('mcaption-regular16 max-w-sm', variant === 'org' && '!text-primary-foreground')}>
              {description ||
                t.rich('headline', {
                  emphasis: chunks => <span className="text-primary">{chunks}</span>,
                  break: () => <br />,
                })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-8">
            {Object.entries(navigationItems || openEduNavigationItem).map(([key, section]) => (
              <div key={key} className={`lg:col-span-${section.colSpan}`}>
                <h3 className={cn('mbutton-semibold16 mb-4', variant === 'org' && '!text-primary-foreground')}>
                  {section.label}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((link: NavigationLink) => (
                    <li key={link.id || link.href}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'mcaption-regular16 p-0 text-[#464646] transition-colors hover:text-[#2B3674]',
                          variant === 'org' && '!text-primary-foreground'
                        )}
                      >
                        {link.icon && <link.icon className="mr-2 h-5 w-5" />}
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Separator className="mt-8 mb-4 h-[1px] w-full bg-muted/80" />
        <div className={cn('text-sm', variant === 'org' && '!text-primary-foreground')}>
          Copyright © {currentYear}. Powered by Openedu
        </div>
      </div>
    </footer>
  );
}
