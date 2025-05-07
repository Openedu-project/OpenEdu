import { Card, CardDescription, CardTitle } from "@oe/ui";
import { Award, DollarSign, Star } from "lucide-react";
import type { ReactNode } from "react";
type TrendColorType = "secondary" | "warning" | "info";
interface TrendCardProps {
  color: TrendColorType;
  title: string;
  highlight: string;
  desc: string;
}

const TrendCard = ({ color, title, highlight, desc }: TrendCardProps) => {
  const icons: Record<TrendColorType, ReactNode> = {
    secondary: <Award />,
    warning: <Star />,
    info: <DollarSign />,
  };

  const textColor: Record<TrendColorType, string> = {
    secondary: "#17BF93",
    warning: "#DCA200 ",
    info: "#1876D2",
  };

  return (
    <Card className="flex h-full w-full flex-col items-center space-y-4 p-4 shadow-md md:p-6">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-full text-center bg-${color}`}
      >
        {icons[color]}
      </div>
      <CardTitle className="text-center font-bold text-foreground text-xl">
        {title}
      </CardTitle>
      <p
        className={`mb-2 font-bold text-xl md:text-3xl text-[${textColor[color]}]`}
      >
        {highlight}
      </p>
      <CardDescription className="text-center text-forground text-md md:text-lg">
        {desc}
      </CardDescription>
    </Card>
  );
};

export { TrendCard, type TrendCardProps, type TrendColorType };
