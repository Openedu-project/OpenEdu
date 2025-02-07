import WhaleKnowledge from '@oe/assets/images/whale-teacher.png';
import { Root as VisuallyHiddenRoot } from '@radix-ui/react-visually-hidden';
import { Link } from '#common/navigation';
import { DialogContent, DialogTitle } from '#shadcn/dialog';

const NotCreator = () => {
  return (
    <DialogContent className="!rounded-3xl gap-0 p-6">
      <VisuallyHiddenRoot>
        <DialogTitle />
      </VisuallyHiddenRoot>
      <div className="space-y-6">
        <img src={WhaleKnowledge.src} alt="Whale Knowledge" width={240} height={240} className="mx-auto mb-6" />
        <h2 className="mb-4 text-center font-semibold text-[28px] leading-[125%]">
          Become OpenEdu Creator
          <br />
          To Create A Launchpad!
        </h2>
        <div className="mb-8">
          <p className="mb-2 text-left font-inter font-normal text-[16px] text-neutral-strong-900 leading-[125%]">
            What you need to do to create a launchpad:
          </p>
          <ul className="list-disc space-y-0.5 pl-6 text-left">
            {[
              'Become OpenEdu Creator',
              'Create a course and not publish yet',
              'Make a launchpad for that course',
              'Deposit 1 NEAR to send request for launchpad publishing approval',
            ].map(item => (
              <li key={item} className="font-inter font-normal text-[16px] text-neutral-strong-900 leading-[125%]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <Link
            href="/register-creator"
            className="block h-fit w-full rounded-lg bg-primary py-4 text-center font-inter font-semibold text-[16px] text-white leading-[125%] no-underline"
          >
            Register To Become Creator
          </Link>
          {/* <Button
            variant="outline"
            className="block h-fit w-full rounded-lg border border-primary py-4 text-center font-inter font-semibold text-[16px] text-primary leading-[125%]"
          >
            Cancel
          </Button> */}
        </div>
      </div>
    </DialogContent>
  );
};

export default NotCreator;
