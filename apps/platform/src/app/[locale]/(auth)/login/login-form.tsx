'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormAction } from '@oe/api/hooks/useFormAction';
import { loginSchema } from '@oe/api/schemas/loginSchema';
import { getMeService } from '@oe/api/services/auth';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { EMPTY_FORM_STATE } from '@oe/api/utils/form';
import { Alert, AlertDescription } from '@oe/ui/shadcn/alert';
import { Form, FormFieldWithLabel, FormSubmitButton } from '@oe/ui/shadcn/form';
import { Input } from '@oe/ui/shadcn/input';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useCallback } from 'react';
import useSWR from 'swr';

import type { LoginSchemaType } from '@oe/api/schemas/loginSchema';
import type { FormActionState } from '@oe/api/utils/form';

import { loginAction } from '@oe/api/actions/auth';
import { InputPassword } from '@oe/ui/components/input-password';

export default function LoginForm() {
  const tAuth = useTranslations('auth');
  const tErrors = useTranslations('errors');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formState, formAction] = useActionState<FormActionState, FormData>(loginAction, EMPTY_FORM_STATE);

  useSWR(formState.status === 'SUCCESS' ? API_ENDPOINT.USERS_ME : null, getMeService);

  const handleSuccess = useCallback(() => {
    router.replace(searchParams.get('next') ?? '/');
  }, [router.replace, searchParams.get]);

  const form = useFormAction<LoginSchemaType>({
    formState,
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    onSuccess: handleSuccess,
  });

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormFieldWithLabel label={tAuth('email')} name="email">
          <Input placeholder={tAuth('emailPlaceholder')} autoComplete="email" />
        </FormFieldWithLabel>
        <FormFieldWithLabel label={tAuth('password')} name="password">
          <InputPassword placeholder={tAuth('passwordPlaceholder')} />
        </FormFieldWithLabel>
        {formState?.status === 'ERROR' && (
          <Alert variant="destructive">
            <AlertDescription>{tErrors(formState.message)}</AlertDescription>
          </Alert>
        )}
        <FormSubmitButton label={tAuth('login')} className="w-full" />
      </form>
    </Form>
  );
}
