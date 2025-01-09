"use client";

import { useRouter } from "#common/navigation";
import { Button } from "#shadcn/button";
import { ChevronLeft } from "lucide-react";

const WalletBackButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" className="p-2" onClick={() => router.back()}>
      <ChevronLeft
        color="#6368DC"
        className="cursor-pointer transition-all hover:scale-110 active:scale-110"
      />
    </Button>
  );
};

export default WalletBackButton;
