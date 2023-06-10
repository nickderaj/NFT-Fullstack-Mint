import { NFT } from '@/models/NFT';
import Image from 'next/image';

type Props = {
  nft: NFT;
};

const NftCard: React.FC<Props> = ({ nft }) => {
  const parseImage = () => {
    if (!nft?.image.startsWith('ipfs://')) return '';
    return `https://ipfs.io/ipfs/${nft.image.slice(7)}`;
  };

  return (
    <div>
      <Image src={parseImage()} alt={nft.name} width={200} height={200} />
      <div>{nft.name}</div>
      <div>{nft.description}</div>
      <div>{nft.image}</div>
      {nft.attributes.map((attribute) => (
        <div key={attribute.trait_type}>
          <div>
            {attribute.trait_type}: {attribute.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NftCard;
