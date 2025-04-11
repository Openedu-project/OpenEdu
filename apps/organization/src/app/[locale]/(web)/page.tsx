// import { getThemeConfigServer } from "@oe/api";
// import { getMetadata } from "@oe/themes";
// import ThemeWebPage from "@oe/themes";

// import type { Metadata } from "next";

// export async function generateMetadata(): Promise<Metadata> {
//   const [themeSystem] = await Promise.all([getThemeConfigServer()]);

//   return getMetadata(themeSystem?.[0]?.value);
// }

export default function Home() {
  // const [themeSystem] = await Promise.all([getThemeConfigServer()]);

  // if (!themeSystem?.[0]?.value) {
  //   return null;
  // }

  // return (
  //   <ThemeWebPage pageKey="homepage" themeSystem={themeSystem?.[0]?.value} />
  // );
  return <div>Hello 111 222</div>;
}
