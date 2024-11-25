import { PROTECTED_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import { Uploader } from '@oe/ui/components/uploader';
import { Button } from '@oe/ui/shadcn/button';
import { Camera, User2 } from 'lucide-react';

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
      <main>
        <Uploader listType="picture-text" aspectRatio={4 / 3} crop={{ locked: false }} accept="image/*">
          <Button>Select files...</Button>
        </Uploader>
        <Uploader listType="picture" itemClassName="h-24 w-24">
          <Button>Select files...</Button>
        </Uploader>
        <Uploader multiple listType="picture">
          <Button>
            <Camera />
          </Button>
        </Uploader>
        <Uploader listType="picture" aspectRatio={1} crop itemClassName="h-40 w-40">
          <Button variant="outline" className="h-40 w-40 p-0">
            <User2 />
          </Button>
        </Uploader>
        <Uploader draggable listType="picture" crop />
      </main>
    </>
  );
}
