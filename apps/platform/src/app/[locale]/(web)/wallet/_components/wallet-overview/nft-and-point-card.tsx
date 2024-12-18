import { ASSET_TYPES } from '@oe/api/utils/wallet';
import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { Award, ChevronRight, Images, type LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useWalletDataStore } from '../../_store/useWalletDataStore';
import AssetCard from './asset-card';

interface IconConfig {
  Icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

interface CardConfig {
  id: string;
  icon: IconConfig;
  label: string;
  value: string;
  link?: string;
  className?: string;
}

interface NavigateButtonProps {
  href?: string;
}

const IconWrapper: React.FC<IconConfig> = ({ Icon, bgColor, iconColor }) => (
  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor}`}>
    <Icon className={`h-6 w-6 ${iconColor}`} />
  </div>
);

const NavigateButton: React.FC<NavigateButtonProps> = ({ href }) => {
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

const NftAndPointCard = () => {
  const { assetList } = useWalletDataStore();
  const pointBalance = assetList?.find(asset => asset.type === ASSET_TYPES.POINT)?.amount ?? '0';
  const { totalNFTSupply } = useWalletDataStore();

  const t = useTranslations('walletPage');

  const CARD_CONFIGS: CardConfig[] = [
    {
      id: 'nft',
      icon: {
        Icon: Images,
        bgColor: 'bg-[#FFF0FE]',
        iconColor: 'text-[#FE95F6]',
      },
      label: t('nftAssets'),
      value: 'dynamicNFT', // Will be replaced with actual NFT supply
      link: '/wallet/nft',
    },
    {
      id: 'points',
      icon: {
        Icon: Award,
        bgColor: 'bg-[#FFF6DC]',
        iconColor: 'text-[#FFBD04]',
      },
      label: t('points'),
      value: 'dynamicPoint', // Will be replaced with actual point balance
      className: 'mt-[6px]',
    },
  ];

  return (
    <>
      {CARD_CONFIGS.map(({ id, icon, label, value, link, className }) => (
        <AssetCard
          key={id}
          icon={<IconWrapper {...icon} />}
          label={label}
          value={
            value === 'dynamicPoint' ? String(pointBalance) : value === 'dynamicNFT' ? String(totalNFTSupply) : value
          }
          actionBtns={link ? <NavigateButton href={link} /> : undefined}
          className={className}
        />
      ))}
    </>
  );
};

export default NftAndPointCard;
