import { Link } from "#common/navigation";
import { Button } from "#shadcn/button";
import { ChevronRight } from "lucide-react";

interface NavigateButtonProps {
  href?: string;
}

const AssetCardNavigateButton: React.FC<NavigateButtonProps> = ({ href }) => {
  if (!href) {
    return null;
  }

  return (
    <Link href={href} className="p-0">
      <Button variant="outline">
        <ChevronRight className="h-6 w-6 text-[#6368DC]" />
      </Button>
    </Link>
  );
};

export default AssetCardNavigateButton;
