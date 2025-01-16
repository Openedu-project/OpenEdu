import { z } from '@oe/api/utils/zod';

export const scrollToError = (element: HTMLElement | null, options?: ScrollOptions) => {
  if (!element) {
    return;
  }

  // Wait for the tab animation to finish
  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
    element.focus();
  }, 100);
};

export function getSchemaShape<T extends z.ZodType>(schema: T) {
  if (schema instanceof z.ZodEffects) {
    return getSchemaShape(schema._def.schema);
  }
  if (schema instanceof z.ZodObject) {
    return schema.shape;
  }
  return {};
}

export function getDefaultValuesFromSchema<T extends z.ZodType>(schema: T): z.infer<T> {
  if (schema instanceof z.ZodEffects) {
    return getDefaultValuesFromSchema(schema._def.schema);
  }

  const shape = getSchemaShape(schema);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return Object.keys(shape).reduce((acc: any, key) => {
    let field = shape[key];

    while (field instanceof z.ZodEffects) {
      field = field._def.schema;
    }

    if (field instanceof z.ZodString) {
      acc[key] = '';
    } else if (field instanceof z.ZodNumber) {
      acc[key] = 0;
    } else if (field instanceof z.ZodBoolean) {
      acc[key] = false;
    } else if (field instanceof z.ZodArray) {
      acc[key] = [];
    } else if (field instanceof z.ZodObject) {
      acc[key] = getDefaultValuesFromSchema(field);
    } else if (field instanceof z.ZodEnum) {
      acc[key] = field.options[0] || '';
    } else if (field instanceof z.ZodNullable) {
      acc[key] = null;
    } else if (field instanceof z.ZodOptional && field._def.innerType instanceof z.ZodString) {
      acc[key] = '';
    } else {
      acc[key] = undefined;
    }

    return acc;
  }, {});
}
