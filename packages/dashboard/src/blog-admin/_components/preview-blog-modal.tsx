import type { IBlog } from '@oe/api';
import { BlogDetails } from '@oe/ui';
import { Modal } from '@oe/ui';

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
