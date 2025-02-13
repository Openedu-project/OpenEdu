import { cn } from "@oe/ui/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LaunchpadNavigationButtons } from "./launchpad-navigation-buttons";

const buttonStyle = {
  base: "flex space-x-2 items-center font-semibold",
  outline:
    "border border-primary bg-transparent rounded-xl text-primary hover:bg-primary/10 hover:text-primary",
  fill: "bg-primary rounded-xl hover:text-white",
};

interface NavigationLaunchpadProps {
  onPrevClick?: () => void;
  onNextClick?: () => void;
}

const NavigationLaunchpad = ({
  onPrevClick,
  onNextClick,
}: NavigationLaunchpadProps) => {
  return (
    <div className="flex space-x-2">
      <LaunchpadNavigationButtons
        nextButtonClassName={cn(buttonStyle.base, buttonStyle.fill)}
        prevButtonClassName={cn(buttonStyle.base, buttonStyle.outline)}
        prevIcon={<ChevronLeft />}
        nextIcon={<ChevronRight />}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        className="mt-0 space-x-2"
        isNextIconStart={false}
      />
    </div>
  );
};

export default NavigationLaunchpad;
