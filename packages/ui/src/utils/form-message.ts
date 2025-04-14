import { toTitleCase } from '@oe/core';
import type { FieldError } from 'react-hook-form';

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

export function getFormErrorMessage(errors: FieldError | undefined) {
  if (!errors) {
    return undefined;
  }
  if (Array.isArray(errors)) {
    const message = errors.find(error => error !== undefined).message;

    return { message, count: errors.filter(error => error !== undefined).length };
  }

  return { message: errors.message };
}
