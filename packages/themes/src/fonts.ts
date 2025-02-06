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
  adjustFontFallback: false,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  adjustFontFallback: false,
});

const aleo = Aleo({
  subsets: ['latin'],
  variable: '--font-aleo',
  display: 'swap',
  adjustFontFallback: false,
});

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
  adjustFontFallback: false,
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
  adjustFontFallback: false,
});

const anekDevanagari = Anek_Devanagari({
  subsets: ['latin'],
  variable: '--font-anek-devanagari',
  display: 'swap',
  adjustFontFallback: false,
});

const assistant = Assistant({
  subsets: ['latin'],
  variable: '--font-assistant',
  display: 'swap',
  adjustFontFallback: false,
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  adjustFontFallback: false,
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
  adjustFontFallback: false,
});

const bitter = Bitter({
  subsets: ['latin'],
  variable: '--font-bitter',
  display: 'swap',
  adjustFontFallback: false,
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  display: 'swap',
  adjustFontFallback: false,
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  adjustFontFallback: false,
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
  adjustFontFallback: false,
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
