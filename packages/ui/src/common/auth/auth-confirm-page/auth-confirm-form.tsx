"use client";

import type { HTTPError } from "@oe/api";
import { loginAction, setPasswordService } from "@oe/api";
import { type SetPasswordSchemaType, setPasswordSchema } from "@oe/api";
import type { AuthEventName } from "@oe/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCallback } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { SuccessDialog } from "#components/dialog";
import { FormWrapper } from "#components/form-wrapper";
import { InputPassword } from "#components/input-password";
import { Alert, AlertDescription } from "#shadcn/alert";
import { Button } from "#shadcn/button";
import { FormFieldWithLabel } from "#shadcn/form";

export function AuthConfirmForm({
  event,
  token,
  email,
  nextPath,
}: {
  event: AuthEventName;
  token: string;
  email: string;
  nextPath: string;
}) {
  const tAuth = useTranslations("auth");
  const tErrors = useTranslations("errors");
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async ({ password }: SetPasswordSchemaType) => {
      await setPasswordService(null, {
        payload: { event, token, email, password },
      });
      await loginAction({
        email,
        password,
        next_path: nextPath,
      });
      mutate(() => true, undefined, { revalidate: true });
      setOpen(true);
      toast.success(tAuth("authConfirm.setPasswordSuccess"));
      router.replace(nextPath);
      router.refresh();
    },
    [event, token, email, nextPath, router, tAuth]
  );
  const handleError = useCallback((error: unknown) => {
    setError((error as HTTPError).message);
  }, []);

  return (
    <>
      <FormWrapper
        id="confirm-invitation"
        schema={setPasswordSchema}
        onSubmit={handleSubmit}
        onError={handleError}
      >
        {({ loading }) => (
          <>
            <FormFieldWithLabel label={tAuth("password")} name="password">
              <InputPassword placeholder={tAuth("passwordPlaceholder")} />
            </FormFieldWithLabel>
            <FormFieldWithLabel
              label={tAuth("confirmPassword")}
              name="confirmPassword"
            >
              <InputPassword
                placeholder={tAuth("confirmPasswordPlaceholder")}
                autoComplete="confirmPassword"
              />
            </FormFieldWithLabel>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{tErrors(error)}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" loading={loading}>
              {tAuth("authConfirm.setPassword")}
            </Button>
          </>
        )}
      </FormWrapper>
      <SuccessDialog
        title={tAuth("authConfirm.setPasswordSuccess")}
        description={tAuth("authConfirm.setPasswordDescription")}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
