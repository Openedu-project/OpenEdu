import type { IBlog } from '@oe/api/types/blog';
import { BlogDetails } from '@oe/ui/components/blog';
import { Modal } from '@oe/ui/components/modal';

interface IPreviewBlogModalProps {
  blogData?: IBlog;
  open: boolean;
  onClose: () => void;
}
export function PreviewBlogModal({ blogData, open, onClose }: IPreviewBlogModalProps) {
  return (
    <Modal open={open} title="  " className="md:max-w-[90vw]" description="  " onClose={onClose} hasCancelButton>
      {blogData && <BlogDetails data={blogData} preview />}
    </Modal>
  );
}
