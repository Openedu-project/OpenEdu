// 'use client';
import { THEMES } from '@oe/themes';

const theme = 'academia';
export default function Home() {
  const HomePage = THEMES[theme].HomePage;
  if (!HomePage) {
    return null;
  }
  return <HomePage />;
}
