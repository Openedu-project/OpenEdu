import { useGetUserProfile } from "@oe/api/hooks/useUser";
import { useUpdateMyProfile } from "@oe/api/hooks/useUserProfile";
import { ownerCollabsLaunchpadSchema } from "@oe/api/schemas/launchpadSchema";
import type { HTTPErrorMetadata } from "@oe/api/utils/http-error";
import { CREATE_LAUNCHPAD_FORM_ID } from "@oe/core/utils/constants";
import {
  FormNestedProvider,
  FormNestedWrapper,
  type INestedFormsValues,
} from "@oe/ui/components/form-wrapper";
import { toast } from "@oe/ui/shadcn/sonner";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { LaunchpadNavigationButtons } from "../_components/launchpad-navigation-buttons";
import { useChangeLaunchpadTab } from "../_hooks/useChangeLaunchpadTab";
import useLaunchpadDetail from "../_hooks/useLaunchpadDetail";
import GeneralInformation from "./general-info";
import Socials from "./socials";

const OwnerAndCollaboratorsBlock = () => {
  const tLaunchpad = useTranslations("creatorSettingLaunchpad.ownerAndCollabs");
  const tError = useTranslations("errors");

  const { launchpad } = useLaunchpadDetail();
  const { handleGoToPrevTab, nextTab, handleTabChange } =
    useChangeLaunchpadTab();

  const { profile } = useGetUserProfile(
    launchpad?.owner?.username ?? "",
    Boolean(launchpad?.owner?.username)
  );
  const { triggerMyProfile } = useUpdateMyProfile();

  const handleOnSubmit = useCallback(
    async (data: INestedFormsValues) => {
      try {
        await triggerMyProfile({
          props: {
            ...profile?.props,
            ...data[CREATE_LAUNCHPAD_FORM_ID.ownerAndCollaborators as string],
          },
        });
        if (nextTab) {
          handleTabChange(nextTab);
        }
      } catch (error) {
        console.error("Update Owner And Collaborators Block Error", error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleTabChange, nextTab, profile?.props, triggerMyProfile, tError]
  );

  return profile ? (
    <FormNestedProvider onSubmit={handleOnSubmit}>
      <FormNestedWrapper
        id={CREATE_LAUNCHPAD_FORM_ID.ownerAndCollaborators ?? ""}
        schema={ownerCollabsLaunchpadSchema}
        tabId="owner-and-collaborators"
        className="mx-auto flex max-w-5xl flex-col gap-spacing-m rounded-lg bg-white px-6 py-5"
        useFormProps={{
          defaultValues: {
            telegram: profile?.props?.telegram ?? "",
          },
        }}
      >
        <h1 className="col-span-1 font-semibold text-xl lg:col-span-2">
          {tLaunchpad("title")}
        </h1>

        <div className="rounded-lg border border-neutral-300 p-6">
          <GeneralInformation profile={profile} />

          <Socials profile={profile} />
        </div>
        <div className="flex justify-end">
          <LaunchpadNavigationButtons
            onNextClick={handleOnSubmit}
            onPrevClick={handleGoToPrevTab}
          />
        </div>
      </FormNestedWrapper>
    </FormNestedProvider>
  ) : (
    <div className="mx-auto flex h-[400px] max-w-5xl flex-col gap-spacing-m rounded-lg bg-white px-6 py-5" />
  );
};

OwnerAndCollaboratorsBlock.displayName = "OwnerAndCollaboratorsBlock";

export default OwnerAndCollaboratorsBlock;
