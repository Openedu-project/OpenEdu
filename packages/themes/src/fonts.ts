import {
  Aleo,
  Alex_Brush,
  Anek_Devanagari,
  Assistant,
  Bitter,
  Great_Vibes,
  Hanken_Grotesk,
  Inter,
  Montserrat,
  Mulish,
  Noto_Sans,
  Nunito,
  Open_Sans,
  Oswald,
  Roboto_Condensed,
  Roboto_Mono,
  Rouge_Script,
  Space_Grotesk,
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

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  variable: '--font-alex-brush',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const rougeScript = Rouge_Script({
  subsets: ['latin'],
  variable: '--font-rouge-script',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
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
  alexBrush,
  greatVibes,
  rougeScript,
  spaceGrotesk,
  hankenGrotesk,
};
