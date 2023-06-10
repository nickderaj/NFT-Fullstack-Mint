import { NFT } from '@/models/NFT';
import Image from 'next/image';

type Props = {
  nft: NFT;
};

const NftCard: React.FC<Props> = ({ nft }) => {
  const parseImage = () => {
    if (!nft?.image?.startsWith('ipfs://')) return '';
    return `https://ipfs.io/ipfs/${nft.image.slice(7)}`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {parseImage() && <Image src={parseImage()} alt={nft.name} width={200} height={200} className="rounded-lg" />}{' '}
      <h2 className="text-lg font-bold text-center mb-2">{nft.name}</h2>
      <h3 className="text-center border-b-2 w-full">Attributes:</h3>
      <p className="leading-tight">
        {nft.attributes.map((attribute) => (
          <div key={attribute.trait_type} className="grid grid-cols-2">
            <div>{attribute.trait_type}:</div>
            <div> {attribute.value}</div>
          </div>
        ))}
      </p>
    </div>
  );
};

export default NftCard;
