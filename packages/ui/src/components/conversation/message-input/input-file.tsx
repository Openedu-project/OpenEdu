import type { IFileResponse } from "@oe/api/types/file";
import DocumentUploadIcon from "@oe/assets/icons/document-upload-icon";
import DriveLogo from "@oe/assets/icons/drive-logo";
import OneDriveLogo from "@oe/assets/icons/onedrive-logo";
import { CirclePlus, Loader2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { FieldValues, Path } from "react-hook-form";
import { Uploader } from "#components/uploader";
import { Button } from "#shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#shadcn/dropdown-menu";
import { FormFieldWithLabel } from "#shadcn/form";
import { Separator } from "#shadcn/separator";
import { cn } from "#utils/cn";
import type { TFileResponse } from "../type";

const MAX_SIZE_BYTES = 2 * 1024 * 1024;
const MAX_FILES = 2;

export const InputFile = <TFormValues extends FieldValues>() => {
  const tAI = useTranslations("aiAssistant");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 rounded-full bg-primary/10 p-1"
        >
          <CirclePlus className="h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 rounded-3xl p-2 md:p-4">
        <DropdownMenuItem disabled>
          <DriveLogo />
          <span className="mcaption-regular14 ml-2">{tAI("connectDrive")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <OneDriveLogo />
          <span className="mcaption-regular14 ml-2">
            {tAI("connectOneDrive")}
          </span>
        </DropdownMenuItem>
        <Separator className="h-0.5 w-full bg-primary/10" />

        <FormFieldWithLabel
          className="relative flex"
          name={"files" as Path<TFormValues>}
          render={({ field }) => (
            <div
              className={cn(
                "flex cursor-pointer select-none items-center gap-2 gap-2 overflow-hidden rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                loading && "cursor-progress opacity-50",
                field.value &&
                  Array.from(field.value).length >= MAX_FILES &&
                  "cursor-not-allowed opacity-50"
              )}
            >
              <DocumentUploadIcon
                width={16}
                height={16}
                color="hsl(var(--foreground))"
              />
              <span className="mcaption-regular14 whitespace-nowrap">
                {tAI("uploadFromComputer")}
              </span>
              {loading && <Loader2Icon className="h-4 w-4 animate-spin" />}
              <Uploader
                multiple
                value={field.value}
                onChange={(files: IFileResponse | IFileResponse[]) => {
                  const customFiles = (files as TFileResponse[])?.map((f) => {
                    if (f.mime?.includes("image") || f.status !== "finished") {
                      return f;
                    }
                    return { ...f, status: "loading" };
                  });
                  field.onChange(customFiles);
                  setOpen(false);
                }}
                maxSizeBytes={MAX_SIZE_BYTES}
                fileListVisible={false}
                accept="image/*, application/pdf, application/vnd.ms-excel, text/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className={cn(
                  "absolute top-0 left-0 overflow-hidden opacity-0"
                )}
                setIsLoading={setLoading}
                maxFiles={MAX_FILES}
                disabled={
                  loading ||
                  (field.value && Array.from(field.value).length >= MAX_FILES)
                }
              />
            </div>
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
