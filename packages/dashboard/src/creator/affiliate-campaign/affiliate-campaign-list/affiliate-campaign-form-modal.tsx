import {
  type CreateAffiliateCampaignSchemaType,
  createAffiliateCampaignSchema,
} from "@oe/api/schemas/affiliateCampaignSchema";
import type {
  IAffiliateCampaignItem,
  IAffiliateCampaignPayload,
} from "@oe/api/types/affiliate-campaign";
import { convertToTimeStamp } from "@oe/core/utils/datetime";
import { DateTimePicker } from "@oe/ui/components/date-time-picker";
import { Modal } from "@oe/ui/components/modal";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@oe/ui/shadcn/form";
import { Input } from "@oe/ui/shadcn/input";
import { Switch } from "@oe/ui/shadcn/switch";
import { useTranslations } from "next-intl";
import { Suspense, useCallback } from "react";

interface IFormAffiliateCampaignModal {
  isCreate: boolean;
  onSubmit: (value: IAffiliateCampaignPayload) => void;
  onClose: () => void;
  loading: boolean;
  data?: IAffiliateCampaignItem | null;
}

export default function FormAffiliateCampaignModal({
  onSubmit,
  onClose,
  isCreate = true,
  data,
}: IFormAffiliateCampaignModal) {
  const t = useTranslations("affiliateCampaignFormModal");

  const handleFormSubmit = useCallback(
    async (value: CreateAffiliateCampaignSchemaType) => {
      const submissionValue = {
        ...value,
        start_date: value.start_date
          ? convertToTimeStamp(value.start_date as unknown as string)
          : undefined,
        end_date:
          value.has_end_date && value.end_date
            ? convertToTimeStamp(value.end_date as unknown as string)
            : 0,
      };

      await onSubmit(submissionValue as unknown as IAffiliateCampaignPayload);
    },
    [onSubmit]
  );

  return (
    <Modal
      open={true}
      title={
        isCreate ? t("createAffiliateCampaign") : t("editAffiliateCampaign")
      }
      onClose={onClose}
      buttons={[
        {
          type: "button",
          label: t("cancel"),
          variant: "outline",
          onClick: () => onClose(),
        },
        {
          type: "submit",
          label: t("save"),
          variant: "default",
        },
      ]}
      validationSchema={createAffiliateCampaignSchema}
      onSubmit={handleFormSubmit}
      defaultValues={{
        ...data,
        start_date: data?.start_date ? new Date(data.start_date) : undefined,
        end_date: data?.end_date ? new Date(data.end_date) : undefined,
        has_end_date: !!data?.end_date,
        enable: data?.enable ?? true,
      }}
    >
      {(form) => {
        const startDate = form.watch("start_date");
        const hasEndDate = form.watch("has_end_date");

        return (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t("placeholderName")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("startDate")}</FormLabel>
                  <Suspense>
                    <DateTimePicker
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      disabled={{ before: new Date() }}
                    />
                  </Suspense>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_end_date"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border-[0.4px] border-border-base-on-canvas p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t("hasEndDate")}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {hasEndDate && (
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("endDate")}</FormLabel>
                    <Suspense>
                      <DateTimePicker
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        disabled={{ before: startDate }}
                      />
                    </Suspense>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="enable"
              render={({ field }) => (
                <FormItem className="mt-2 flex flex-row items-center justify-between rounded-lg border-[0.4px] border-border-base-on-canvas p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">{t("enable")}</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        );
      }}
    </Modal>
  );
}
