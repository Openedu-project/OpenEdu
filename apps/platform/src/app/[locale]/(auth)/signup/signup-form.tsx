'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '@oe/api/hooks/useAuth';
import { type SignUpSchemaType, signUpSchema } from '@oe/api/schemas/signUpSchema';
import { Link } from '@oe/ui/common/navigation';
import { InputPassword } from '@oe/ui/components/input-password';
import { Button } from '@oe/ui/shadcn/button';
import { Checkbox } from '@oe/ui/shadcn/checkbox';
import { Form, FormControl, FormField, FormFieldWithLabel, FormItem, FormMessage } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function SignUpForm() {
  const tAuth = useTranslations('auth');

  const { triggerSignUp } = useSignUp();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      display_name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAgree: false,
    },
  });

  const onSubmit = async (values: SignUpSchemaType) => {
    await triggerSignUp(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormFieldWithLabel label={tAuth('displayName')} name="display_name">
          <Input placeholder={tAuth('displayNamePlaceholder')} />
        </FormFieldWithLabel>
        <FormFieldWithLabel label={tAuth('email')} name="email">
          <Input placeholder={tAuth('emailPlaceholder')} type="email" />
        </FormFieldWithLabel>
        <FormFieldWithLabel label={tAuth('password')} name="password">
          <InputPassword placeholder={tAuth('passwordPlaceholder')} />
        </FormFieldWithLabel>
        <FormFieldWithLabel label={tAuth('confirmPassword')} name="confirmPassword">
          <InputPassword placeholder={tAuth('confirmPasswordPlaceholder')} />
        </FormFieldWithLabel>
        <FormField
          control={form.control}
          name="isAgree"
          render={({ field }) => (
            <FormItem className="[&>div]:!mt-0 relative my-6 space-y-1">
              <div className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <span>
                    <Link href="#" className="mbutton-regular16 text-bg-info-600 hover:opacity-75">
                      I agreed to the Terms & Conditions
                    </Link>
                  </span>
                </div>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <div className="mt-6 flex items-center justify-center">
          <p>{tAuth('alreadyAccount')}</p>
          <Link href="/login?next=/" size="sm" className="giant-iheading-semibold16 p-1">
            {tAuth('login')}
          </Link>
        </div>
      </form>
    </Form>
  );
}
