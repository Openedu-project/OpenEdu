import { Card, CardContent, CardHeader } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";
import type { ReactNode } from "react";

interface AssetCardProps {
  highlighted?: boolean;
  icon: ReactNode;
  label: string;
  value?: ReactNode;
  actionBtns?: ReactNode;
  cardContent?: ReactNode;
  className?: string;
}

const AssetCard = ({
  highlighted,
  icon,
  label,
  value,
  actionBtns,
  cardContent,
  className,
}: AssetCardProps) => (
  <Card
    className={cn(
      "rounded-[12px] p-3 shadow-none transition-all hover:scale-[102%] sm:p-4",
      highlighted ? "border border-[#33C639]" : "border-none",
      className
    )}
  >
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 sm:mb-1">
        <div className="flex w-fit items-center gap-2">
          <div>{icon}</div>
          <p className="font-semibold text-[14px] leading-[125%] sm:text-[16px]">
            {label}
          </p>
        </div>
        {actionBtns && <div className="flex gap-4">{actionBtns}</div>}
      </CardHeader>
      {cardContent ?? (
        <CardContent className="p-0 pl-10 font-bold text-[24px] sm:text-[28px]">
          {value}
        </CardContent>
      )}
    </>
  </Card>
);

export default AssetCard;
