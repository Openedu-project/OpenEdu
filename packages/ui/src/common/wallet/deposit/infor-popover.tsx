import { Popover, PopoverContent, PopoverTrigger } from "@oe/ui/shadcn/popover";
import { CircleHelp } from "lucide-react";
import { useTranslations } from "next-intl";

const InforPopover = () => {
  const t = useTranslations("depositPage");
  return (
    <Popover>
      <PopoverTrigger>
        <CircleHelp className="w-4 h-4" />
      </PopoverTrigger>
      <PopoverContent className="text-[14px] rounded-2xl">
        {t("inforPopover")}
      </PopoverContent>
    </Popover>
  );
};

export default InforPopover;
