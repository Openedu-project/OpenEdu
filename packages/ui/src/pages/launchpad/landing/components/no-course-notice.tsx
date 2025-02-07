import WhaleNotFound from '@oe/assets/images/whale-not-found.png';
import { Root as VisuallyHiddenRoot } from '@radix-ui/react-visually-hidden';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { DialogContent, DialogTitle } from '#shadcn/dialog';

const NoCourseNotice = ({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <DialogContent className="!rounded-3xl gap-0 p-6">
      <VisuallyHiddenRoot>
        <DialogTitle />
      </VisuallyHiddenRoot>
      <div className="space-y-6">
        <img src={WhaleNotFound.src} alt="Whale Knowledge" width={240} height={240} className="mx-auto mb-6" />
        <h2 className="mb-4 text-center font-semibold text-[28px] leading-[125%]">You Have No Course Yet!</h2>
        <div className="mb-8">
          <p className="mb-2 text-left font-inter font-normal text-[16px] text-neutral-strong-900 leading-[125%]">
            You need a course including at least 4 sections (at least 1 lesson included for each section) to make
            launchpad! Please create new course before making new launchpad!
          </p>
        </div>
        <div className="space-y-3">
          <Link
            href="/register-creator"
            className="block h-fit w-full rounded-lg bg-primary py-4 text-center font-inter font-semibold text-[16px] text-white leading-[125%] no-underline"
          >
            Create New Course
          </Link>
          <Button
            variant="outline"
            className="block h-fit w-full rounded-lg border border-primary py-4 text-center font-inter font-semibold text-[16px] text-primary leading-[125%]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default NoCourseNotice;
