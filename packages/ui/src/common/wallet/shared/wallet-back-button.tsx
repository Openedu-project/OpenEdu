'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from '#common/navigation';
import { Button } from '#shadcn/button';

const WalletBackButton = () => {
  const router = useRouter();

  return (
    <Button variant="ghost" className="p-2" onClick={() => router.push('/wallet')}>
      <ChevronLeft color="#6368DC" className="cursor-pointer transition-all hover:scale-110 active:scale-110" />
    </Button>
  );
};

export default WalletBackButton;
