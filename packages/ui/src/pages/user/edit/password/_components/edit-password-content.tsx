"use client";
import type { HTTPErrorMetadata } from "@oe/api";
import { logoutAction, useChangeMyPassword } from "@oe/api";
import {
  type IChangePaswordFormSchemaType,
  changePaswordFormSchema,
} from "@oe/api";
import { AUTH_ROUTES, resetAllStores } from "@oe/core";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { FormWrapper } from "#components/form-wrapper";
import { InputPassword } from "#components/input-password";
import { Button } from "#shadcn/button";
import { FormFieldWithLabel } from "#shadcn/form";

export function EditPasswordContent() {
  const tMyPwd = useTranslations("userProfile.myPassword");
  const tError = useTranslations("errors");
  const router = useRouter();
  const { triggerChangePassword } = useChangeMyPassword();

  const handleLogout = useCallback(
    async (isRedirectLoginPage: boolean) => {
      await logoutAction();
      await mutate(() => true, undefined, { revalidate: false });
      resetAllStores();
      router.push(
        isRedirectLoginPage ? AUTH_ROUTES.login : AUTH_ROUTES.forgotPassword
      );
    },
    [router]
  );

  const handleFormSubmit = useCallback(
    async (value: IChangePaswordFormSchemaType) => {
      const { new_password, old_password } = value;
      try {
        await triggerChangePassword({
          old_password,
          new_password,
        });
        toast.success(tMyPwd("changePwdSuccess"));
        await handleLogout(true);
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleLogout, tError, tMyPwd, triggerChangePassword]
  );

  const handleNavForgotPwd = useCallback(async () => {
    await handleLogout(false);
  }, [handleLogout]);

  return (
    <div className="mx-3 max-w-full rounded-[12px] border p-6 xl:mx-0">
      <FormWrapper
        id="form_change_pwd"
        schema={changePaswordFormSchema}
        useFormProps={{
          defaultValues: {
            old_password: "",
            new_password: "",
            confirmPassword: "",
          },
        }}
        onSubmit={handleFormSubmit}
      >
        {({ form }) => (
          <div>
            <div className="grid gap-6">
              <FormFieldWithLabel
                label={tMyPwd("currentPwd")}
                name="old_password"
                className="space-y-1"
              >
                <InputPassword
                  className="!mt-0 px-4 py-[18px]"
                  placeholder="Current password"
                />
              </FormFieldWithLabel>

              <FormFieldWithLabel
                label={tMyPwd("newPwd")}
                name="new_password"
                className="space-y-1"
              >
                <div className="relative space-y-1">
                  <InputPassword
                    className="!mt-0 px-4 py-[18px]"
                    placeholder="New password"
                  />
                </div>
              </FormFieldWithLabel>

              <FormFieldWithLabel
                label={tMyPwd("confirmPassword")}
                name="confirmPassword"
                className="space-y-1"
              >
                <div className="relative space-y-1">
                  <InputPassword
                    className="!mt-0 px-4 py-[18px]"
                    placeholder="Confirm new password"
                  />
                </div>
              </FormFieldWithLabel>
            </div>

            <Button
              variant="ghost"
              className="mbutton-semibold16 hover:primary/70 p-0 text-primary hover:bg-inherit"
              onClick={handleNavForgotPwd}
            >
              {tMyPwd("forgotPassword")}
            </Button>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                className="mbutton-bold12 md:mbutton-bold16"
                onClick={() => form.reset()}
              >
                {tMyPwd("cancel")}
              </Button>
              <Button
                variant="default"
                className="mbutton-bold12 md:!mbutton-bold16"
                type="submit"
              >
                {tMyPwd("changePwd")}
              </Button>
            </div>
          </div>
        )}
      </FormWrapper>
    </div>
  );
}
