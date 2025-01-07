import { AuthorPage } from '@oe/ui/common/pages';

export default function BlogAuthorPage({ params }: { params: { username: string } }) {
  return <AuthorPage params={params} />;
}
