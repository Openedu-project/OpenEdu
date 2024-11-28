import {
  Aleo,
  Anek_Devanagari,
  Assistant,
  Bitter,
  Inter,
  Montserrat,
  Mulish,
  Noto_Sans,
  Nunito,
  Open_Sans,
  Oswald,
  Roboto_Condensed,
  Roboto_Mono,
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const aleo = Aleo({
  subsets: ['latin'],
  variable: '--font-aleo',
  display: 'swap',
});

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const anekDevanagari = Anek_Devanagari({
  subsets: ['latin'],
  variable: '--font-anek-devanagari',
  display: 'swap',
});

const assistant = Assistant({
  subsets: ['latin'],
  variable: '--font-assistant',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

const bitter = Bitter({
  subsets: ['latin'],
  variable: '--font-bitter',
  display: 'swap',
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const fonts = {
  inter,
  montserrat,
  aleo,
  mulish,
  nunito,
  anekDevanagari,
  assistant,
  openSans,
  oswald,
  bitter,
  robotoCondensed,
  robotoMono,
  notoSans,
};
