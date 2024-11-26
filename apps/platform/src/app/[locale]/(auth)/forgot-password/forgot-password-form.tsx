'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@oe/api/hooks/useForgotPassword';
import { type ForgotPasswordSchemaType, forgotPasswordSchema } from '@oe/api/schemas/forgotPasswordSchema';
import { AUTH_ROUTES } from '@oe/core/utils/routes';
import { useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordForm() {
  const t = useTranslations('forgotPassword');
  const router = useRouter();
  const { triggerForgetPassword, isLoading } = useForgotPassword();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: ForgotPasswordSchemaType) => {
    try {
      await triggerForgetPassword(values);

      router.push(`${AUTH_ROUTES.forgotPasswordSuccess}?email=${values.email}`);
    } catch (error) {
      console.error('Error:', error);

      return error;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" loading={isLoading}>
          {t('sendYourEmail')}
        </Button>
      </form>
    </Form>
  );
}
