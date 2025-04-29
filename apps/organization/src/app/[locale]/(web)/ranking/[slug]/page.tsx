// export default async function RankingDetailPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const slug = (await params).slug;

import { NotFoundPage } from "@oe/ui";

//   return (
//     <div>
//       <RankingDetailOutline id={slug} />
//     </div>
//   );
// }

export default function RankingDetailPage() {
  return <NotFoundPage />;
}
