import type { TFunction } from '@oe/i18n/types';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import { type TypeOf, ZodError, type ZodIssue, type ZodTooBigIssue, type ZodTooSmallIssue, z } from 'zod';

const customErrorMap = ({
  issue,
  defaultError,
  t,
}: { issue: z.ZodIssueOptionalMessage | z.ZodIssue; defaultError: string; t: TFunction }) => {
  // console.log('------customErrorMap', issue, ctx);
  switch (issue.code) {
    case z.ZodIssueCode.too_small:
      return {
        ...issue,
        message: t(`too_small.${issue.type}.${issue.exact ? 'exact' : 'inclusive'}`, {
          minimum: issue.minimum as number,
          type: (issue.path[0] as string)?.charAt(0).toUpperCase() + (issue.path[0] as string)?.slice(1),
        }),
      };
    case z.ZodIssueCode.too_big:
      return {
        ...issue,
        message: t(`too_big.${issue.type}.${issue.exact ? 'exact' : 'inclusive'}`, {
          maximum: issue.maximum as number,
          type: (issue.path[0] as string)?.charAt(0).toUpperCase() + (issue.path[0] as string)?.slice(1),
        }),
      };
    case z.ZodIssueCode.invalid_string:
      return { ...issue, message: t(`invalid_string.${issue.validation}`) };
    default:
      return { ...issue, message: defaultError };
  }
};

const registerCustomZodErrorMap = (t: TFunction) => {
  z.setErrorMap((issue, ctx) => {
    return customErrorMap({ issue, defaultError: ctx.defaultError, t });
  });
};

export {
  z,
  ZodError,
  type ZodIssue,
  type ZodTooBigIssue,
  type ZodTooSmallIssue,
  type TypeOf,
  customErrorMap,
  registerCustomZodErrorMap,
};
