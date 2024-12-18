import { toast } from '../shadcn/sonner';

export const copyToClipboard = (text: string, message: string, duration?: number) => {
  void navigator.clipboard.writeText(text).then(() => toast.success(message, { duration }));
};

export function shortenAddress(address: string, startLength = 6, endLength = 4): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);

  return `${start}...${end}`;
}

export function snakeToSpace(str: string): string {
  return str.replaceAll('_', ' ');
}
