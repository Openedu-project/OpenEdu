import { toTitleCase } from '@oe/core/utils/string';

export function parseFormMessage(message: string) {
  const messages = message.split('--');
  const result: Record<string, string> = {};
  for (const msg of messages) {
    const [key, value] = msg.split(':');

    if (key && value) {
      result[key] = toTitleCase(value);
    } else {
      result.key = msg;
    }
  }
  return result;
}
