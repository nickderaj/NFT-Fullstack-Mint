import { MAX_MINT, MIN_MINT } from '@/constants/contract.constants';
import Button from '@/elements/buttons/Button';
import LinkButton from '@/elements/buttons/LinkButton';
import { fetchNFTs, getPrice, mint } from '@/helpers/contract';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MintForm: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState<number>(0);
  const [errorText, setErrorText] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Mint');
  const { latestTx } = useSelector((state: RootState) => state.nft);
  const dispatch = useDispatch();

  const handleMint = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      let currAmount = amount;
      if (currAmount < MIN_MINT) currAmount = MIN_MINT;
      if (currAmount > MAX_MINT) currAmount = MAX_MINT;

      await mint(currAmount, setButtonText, dispatch);
    } catch (error) {
      console.log('Error minting: ', error);
    }
  };

  const handleGetNFTs = async () => {
    const nfts = await fetchNFTs();
    console.log(nfts);
  };

  const handleDecrement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (amount === MIN_MINT) return;
    setAmount((prevState) => prevState - 1);
  };

  const handleIncrement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (amount === MAX_MINT) return;
    setAmount((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (amount < MIN_MINT) setAmount(MIN_MINT);
    if (amount > MAX_MINT) setAmount(MAX_MINT);
  }, [amount]);

  useEffect(() => {
    getPrice()
      .then((p) => setPrice(p || 0))
      .catch((e) => console.log('Error getting price: ', e));

    handleGetNFTs();
  }, []);

  const priceFormat = +(price * amount).toFixed(4) == 0 ? 'Free' : (price * amount).toFixed(4) + ' ETH';

  return (
    <form className="flex flex-col max-w-[240px]">
      <Image src="/mint.gif" alt="Mint" width={240} height={240} className="rounded-full " />
      <h1 className="text-2xl font-bol text-center mt-6">Mint</h1>
      <h2 className="text-center mb-6">Price: {priceFormat}</h2>
      <div className="grid grid-cols-3 items-center justify-center mb-4">
        <button onClick={handleDecrement} className="text-2xl font-bold flex flex-1 justify-center">
          -
        </button>
        <div className="flex flex-shrink justify-center">{amount}</div>
        <button onClick={handleIncrement} className="text-2xl font-bold flex flex-1  justify-center">
          +
        </button>
      </div>
      <Button onClick={handleMint} title={buttonText} disabled={buttonText !== 'Mint'} className="mb-2" />
      <LinkButton href="/nft" title="View NFTs" variant="secondary" />
      {latestTx && (
        <div className="flex flex-col items-center justify-center mt-2">
          <h1 className="text-xl font-bold">Latest Transaction</h1>
          <a href={`https://rinkeby.etherscan.io/tx/${latestTx}`} target="_blank" rel="noreferrer" className="text-blue-500">
            {latestTx}
          </a>
        </div>
      )}
    </form>
  );
};

export default MintForm;
