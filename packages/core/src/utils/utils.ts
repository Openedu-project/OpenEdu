import type { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

export function setFormValues<T extends FieldValues, U extends object>(data: U, setValue: UseFormSetValue<T>) {
  for (const key of Object.keys(data) as Array<keyof U>) {
    const value = data[key];

    if (key === 'type' && typeof value === 'string') {
      const typeValue = value === 'flat' || value === 'percent' ? value : undefined;

      setValue(key as unknown as Path<T>, typeValue as PathValue<T, Path<T>>, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setValue(key as unknown as Path<T>, value as PathValue<T, Path<T>>, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  }
}

export const getCurrentRouter = () => {
  if (typeof window !== 'undefined') {
    const { protocol, host: domain, pathname, search, hash } = window.location;

    return `${protocol}//${domain}${pathname}${search}${hash}`;
  }

  return '/';
};
