import type { TNFTItem } from '@oe/api/types/wallet';
import { Dialog, DialogContent, DialogTitle } from '#shadcn/dialog';
import NFTDetail from './nft-detail';

interface NFTDialogProps {
  nft: TNFTItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const NftDialog = ({ nft, isOpen, onClose }: NFTDialogProps) => {
  if (!nft) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <>
          <DialogTitle className="pb-4">{nft.metadata.title || 'NFT Details'}</DialogTitle>
          <NFTDetail nft={nft} />
        </>
      </DialogContent>
    </Dialog>
  );
};

export default NftDialog;
