import { getThemeConfigServer } from "@oe/api";
import Whale from "@oe/assets/images/theme/aiedu/whale.png";
import { getMetadata } from "@oe/themes";
import { Image, NotFoundPage } from "@oe/ui";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  return getMetadata(themeSystem?.[0]?.value);
}

export default async function Rankingpage() {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme;
  if (!(themeSystem?.[0]?.value && themeName)) {
    return <NotFoundPage />;
  }

  return (
    <div className="container space-y-4 py-12 text-center">
      <Image
        alt="whale"
        src={Whale?.src}
        height={200}
        width={200}
        className="h-[400px] w-fit"
      />
      <h2> Coming soon</h2>
    </div>
  );
}
