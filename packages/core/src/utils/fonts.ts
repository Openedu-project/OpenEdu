import {
  Aleo,
  Alex_Brush,
  Anton,
  Be_Vietnam_Pro,
  Bitter,
  Comfortaa,
  Cormorant_Garamond,
  Dancing_Script,
  EB_Garamond,
  Great_Vibes,
  Hanken_Grotesk,
  Imperial_Script,
  Inter,
  Lobster,
  Lora,
  Montserrat,
  Mulish,
  Noto_Sans,
  Nunito,
  Open_Sans,
  Oswald,
  Pinyon_Script,
  Playfair_Display,
  Raleway,
  Roboto_Condensed,
  Roboto_Mono,
  Roboto_Slab,
  Space_Grotesk,
} from 'next/font/google';

const inter = Inter({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const montserrat = Montserrat({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-montserrat',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const aleo = Aleo({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-aleo',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const mulish = Mulish({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-mulish',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const nunito = Nunito({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-nunito',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

const openSans = Open_Sans({
  subsets: [
    'cyrillic',
    'cyrillic-ext',
    'greek',
    'greek-ext',
    'hebrew',
    'latin',
    'latin-ext',
    'math',
    'symbols',
    'vietnamese',
  ],
  variable: '--font-open-sans',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['300', '400', '500', '600', '700', '800'],
});

const oswald = Oswald({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-oswald',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['200', '300', '400', '500', '600', '700'],
});

const bitter = Bitter({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-bitter',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const robotoCondensed = Roboto_Condensed({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-roboto-condensed',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const robotoMono = Roboto_Mono({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-roboto-mono',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

const notoSans = Noto_Sans({
  subsets: ['cyrillic', 'cyrillic-ext', 'devanagari', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-noto-sans',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const alexBrush = Alex_Brush({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-alex-brush',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const greatVibes = Great_Vibes({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-great-vibes',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-space-grotesk',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['300', '400', '500', '600', '700'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const pinyonScript = Pinyon_Script({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-pinyon-script',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-be-vietnam-pro',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['cyrillic', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-playfair-display',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['400', '500', '600', '700', '800', '900'],
});

const lora = Lora({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'math', 'symbols', 'vietnamese'],
  variable: '--font-lora',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['400', '500', '600', '700'],
});

const raleway = Raleway({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-raleway',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const anto = Anton({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-anto',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const lobster = Lobster({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-lobster',
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

const comfortaa = Comfortaa({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-comfortaa',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['300', '400', '500', '600', '700'],
});

const dancingScript = Dancing_Script({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-dancing-script',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['400', '500', '600', '700'],
});

const robotoSlab = Roboto_Slab({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-roboto-slab',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const ebGaramond = EB_Garamond({
  subsets: ['cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-eb-garamond',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['400', '500', '600', '700', '800'],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
  adjustFontFallback: false,
  weight: ['300', '400', '500', '600', '700'],
});

const imperialScript = Imperial_Script({
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  variable: '--font-imperial-script',
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
  openSans,
  oswald,
  bitter,
  robotoCondensed,
  robotoMono,
  notoSans,
  alexBrush,
  greatVibes,
  spaceGrotesk,
  hankenGrotesk,
  pinyonScript,
  beVietnamPro,
  playfairDisplay,
  lora,
  raleway,
  anto,
  lobster,
  comfortaa,
  dancingScript,
  robotoSlab,
  ebGaramond,
  cormorantGaramond,
  imperialScript,
};
