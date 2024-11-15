'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormAction } from '@oe/api/hooks/useFormAction';
import { loginSchema } from '@oe/api/schemas/loginSchema';
import { getMeService } from '@oe/api/services/auth';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { EMPTY_FORM_STATE } from '@oe/api/utils/form';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useCallback } from 'react';
import useSWR from 'swr';
import { Alert, AlertDescription } from '#shadcn/alert';
import { Form, FormFieldWithLabel, FormSubmitButton } from '#shadcn/form';
import { Input } from '#shadcn/input';

import type { LoginSchemaType } from '@oe/api/schemas/loginSchema';
import type { FormActionState } from '@oe/api/utils/form';

import { loginAction } from '@oe/api/actions/auth';

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
    <>
      <h1 className="text-center text-2xl text-primary">{tAuth('login')}</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <FormFieldWithLabel label={tAuth('email')} name="email">
            <Input placeholder={tAuth('emailPlaceholder')} autoComplete="email" />
          </FormFieldWithLabel>
          <FormFieldWithLabel label={tAuth('password')} name="password">
            <Input type="password" placeholder={tAuth('passwordPlaceholder')} />
          </FormFieldWithLabel>
          {formState?.status === 'ERROR' && (
            <Alert variant="destructive">
              <AlertDescription>{tErrors(formState.message)}</AlertDescription>
            </Alert>
          )}
          <FormSubmitButton label={tAuth('login')} className="w-full" />
        </form>
      </Form>
    </>
  );
}
