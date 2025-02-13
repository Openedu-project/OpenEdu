"use client";
import {
  useGetUserProfile,
  useUpdateMyProfile,
} from "@oe/api/hooks/useUserProfile";
import {
  type IEditAccountFormSchemaType,
  editAccountFormSchema,
} from "@oe/api/schemas/profileSchema";
import type { IMyProfilePayload } from "@oe/api/types/user-profile";
import { createAPIUrl } from "@oe/api/utils/fetch";
import Mobile from "@oe/assets/icons/mobile";
import SmsIcon from "@oe/assets/icons/sms";
import TagUser from "@oe/assets/icons/tag-user";
import User from "@oe/assets/icons/user";
import { PLATFORM_ROUTES } from "@oe/core/utils/routes";
import { Button } from "@oe/ui/shadcn/button";
import { FormFieldWithLabel } from "@oe/ui/shadcn/form";
import { Input } from "@oe/ui/shadcn/input";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormWrapper } from "#components/form-wrapper";
import { Spinner } from "#components/spinner";

export default function EditAccountContent() {
  const tAccount = useTranslations("userProfile.account");
  const { user } = useParams();
  const router = useRouter();

  const { dataUserProfile, isLoadingUserProfile, mutateUserProfile } =
    useGetUserProfile(user as string);
  const { triggerMyProfile } = useUpdateMyProfile();

  const handleSubmitForm = async (value: IEditAccountFormSchemaType) => {
    try {
      const updateFields = {
        phone: value.phone,
      } as IMyProfilePayload;

      if (value.username !== dataUserProfile?.username) {
        updateFields.username = value.username;
      }

      await triggerMyProfile(updateFields);

      if (value.username === dataUserProfile?.username) {
        await mutateUserProfile();
      } else {
        router.push(
          createAPIUrl({
            endpoint: PLATFORM_ROUTES.editProfileAccount,
            params: {
              username: value.username,
            },
          })
        );
      }

      toast.success(tAccount("updateSuccess"));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAccount = () => {
    toast.error(tAccount("deleteAccountMessage"));
  };

  if (isLoadingUserProfile) {
    return (
      <div className="container flex items-center justify-center bg-white">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-[12px] border p-6">
        <FormWrapper
          id="form_edit_account"
          schema={editAccountFormSchema}
          useFormProps={{
            defaultValues: {
              username: dataUserProfile?.username || "",
              id: dataUserProfile?.id || "",
              email: dataUserProfile?.email || "",
              phone: dataUserProfile?.phone || "",
            },
          }}
          onSubmit={handleSubmitForm}
        >
          {({ setValue }) => (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormFieldWithLabel
                  label={tAccount("userName")}
                  name="username"
                >
                  <Input
                    placeholder={tAccount("userName")}
                    prefixIcon={<User />}
                  />
                </FormFieldWithLabel>

                <FormFieldWithLabel label={tAccount("userID")} name="id">
                  <Input
                    disabled
                    placeholder={tAccount("userID")}
                    prefixIcon={<TagUser />}
                  />
                </FormFieldWithLabel>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormFieldWithLabel label="Email" name="email">
                  <Input
                    disabled
                    placeholder="Ex: abc@gmail.com"
                    prefixIcon={<SmsIcon />}
                  />
                </FormFieldWithLabel>

                <FormFieldWithLabel
                  label={tAccount("phoneNUmber")}
                  name="phone"
                >
                  <Input prefixIcon={<Mobile />} />
                </FormFieldWithLabel>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="mbutton-bold16"
                  onClick={() => {
                    if (dataUserProfile) {
                      setValue("username", dataUserProfile.username);
                      setValue("id", dataUserProfile.id);
                      setValue("email", dataUserProfile.email);
                      setValue("phone", dataUserProfile.phone);
                    }
                  }}
                >
                  {tAccount("cancel")}
                </Button>
                <Button
                  variant="default"
                  className="!mbutton-bold16"
                  type="submit"
                >
                  {tAccount("saveChanges")}
                </Button>
              </div>
            </>
          )}
        </FormWrapper>
      </div>

      <div className="mbutton-semibold16 mt-6 flex flex-col rounded-[12px] border p-6">
        <h4>{tAccount("deleteYourAccount")}</h4>
        <p className="mbutton-regular16 my-6 text-neutral-800">
          {tAccount("deleteDescription")}
        </p>
        <Button
          variant="destructive"
          className="mbutton-semibold16 ml-auto"
          onClick={handleDeleteAccount}
        >
          {tAccount("deleteAccount")}
        </Button>
      </div>
    </div>
  );
}
