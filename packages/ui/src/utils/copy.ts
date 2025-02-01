import { toast } from '#shadcn/sonner';

export const copyToClipboard = (text: string, message: string, duration?: number) => {
  void navigator.clipboard.writeText(text).then(() => toast.success(message, { duration }));
};
