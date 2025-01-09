import { LucideIcon } from "lucide-react";
import React from "react";

interface IconConfig {
  Icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

const AssetCardIconWrapper: React.FC<IconConfig> = ({
  Icon,
  bgColor,
  iconColor,
}) => (
  <div
    className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor}`}
  >
    <Icon className={`h-6 w-6 ${iconColor}`} />
  </div>
);

export default AssetCardIconWrapper;
