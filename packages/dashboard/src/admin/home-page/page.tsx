import { PROTECTED_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';

export default function Home() {
  return (
    <>
      <nav>
        <Link href="/">Home</Link>
        <Link href={PROTECTED_ROUTES.affiliate}>Affliate</Link>
        <Link href={PROTECTED_ROUTES.blog}>Blog</Link>
        <Link href={PROTECTED_ROUTES.learner}>Learner</Link>
        <Link href={PROTECTED_ROUTES.creator}>Creator</Link>
        <Link href="/about">About</Link>
      </nav>
      <main>Dashboard</main>
    </>
  );
}
