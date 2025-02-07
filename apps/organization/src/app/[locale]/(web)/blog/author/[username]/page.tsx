import AuthorPage from '@oe/ui/pages/blog/author';

export default function BlogAuthorPage({ params }: { params: { username: string } }) {
  return <AuthorPage params={params} />;
}
