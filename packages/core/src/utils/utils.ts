import type { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { toast } from 'sonner';

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

export const copyToClipboard = (text: string, message: string) => {
  void navigator.clipboard.writeText(text);
  toast.success(message);
};

export function formatPrice(price: number, currency = 'VND', isFree = false): string {
  if (isFree) {
    return 'Free';
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export const getAlphabetLabel = (index: number): string => String.fromCodePoint(65 + index); // 65 is ASCII for 'A'

export const formatNumber = (value: string | number): string => {
  if (!value && value !== 0) {
    return '';
  }

  // Convert to string and remove non-digit characters except decimal
  const cleanValue = value.toString().replace(/[^\d.]/g, '');

  // Handle decimal points
  const parts = cleanValue.split('.');
  if (parts.length > 2) {
    parts.splice(2);
  }

  // Format with commas
  return (
    (parts[0] ? parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '') + (parts[1] ? `.${parts[1].slice(0, 2)}` : '')
  );
};
