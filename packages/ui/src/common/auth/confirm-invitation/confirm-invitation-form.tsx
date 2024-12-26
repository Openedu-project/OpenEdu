'use client';
import { setPasswordSchema } from '@oe/api/schemas/authSchema';
import { useTranslations } from 'next-intl';
import { FormWrapper } from '#components/form-wrapper';
import { InputPassword } from '#components/input-password';
import { Button } from '#shadcn/button';
import { FormFieldWithLabel } from '#shadcn/form';

export function ConfirmInvitationForm() {
  const tAuth = useTranslations('auth');
  return (
    <FormWrapper id="confirm-invitation" schema={setPasswordSchema}>
      {({ loading }) => (
        <>
          <FormFieldWithLabel label={tAuth('password')} name="password">
            <InputPassword placeholder={tAuth('passwordPlaceholder')} />
          </FormFieldWithLabel>
          <FormFieldWithLabel label={tAuth('confirmPassword')} name="confirmPassword">
            <InputPassword placeholder={tAuth('confirmPasswordPlaceholder')} autoComplete="confirmPassword" />
          </FormFieldWithLabel>
          <Button type="submit" className="w-full" loading={loading}>
            {tAuth('confirmInvitation.setPassword')}
          </Button>
        </>
      )}
    </FormWrapper>
  );
}
