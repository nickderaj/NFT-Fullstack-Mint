import { generateReceipt } from '@/api/nft.api';
import { MAX_MINT, MIN_MINT } from '@/constants/contract.constants';
import Button from '@/elements/buttons/Button';
import LinkButton from '@/elements/buttons/LinkButton';
import Spinner from '@/elements/loaders/Spinner';
import { fetchNFTs, getContractConfig, mint } from '@/helpers/contract';
import { parseDate } from '@/helpers/helpers';
import { setNftsOwned } from '@/redux/slices/nftSlice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NricInput from './NricInput';

const MintForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState<number>(0);
  const [saleTime, setSaleTime] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Mint');
  const { nric, walletAddress } = useSelector((state: RootState) => state.user);
  const { latestTx, nftsOwned } = useSelector((state: RootState) => state.nft);
  const dispatch = useDispatch();

  const handleMint = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      let currAmount = amount;
      if (currAmount < MIN_MINT) currAmount = MIN_MINT;
      if (currAmount > MAX_MINT - nftsOwned.length) currAmount = MAX_MINT - nftsOwned.length;
      const res = await generateReceipt(walletAddress, nric);
      const { encryptedReceipt, hashedReceipt } = res?.data;

      await mint(currAmount, setButtonText, dispatch, encryptedReceipt, hashedReceipt);
    } catch (error) {
      console.log('Error minting: ', error);
    }
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

  const refetchNFTs = async () => {
    setIsFetching(true);
    const nfts = await fetchNFTs();
    if (nfts.length === 0) toast('No NFTs found - mint first!', { type: 'error' });
    dispatch(setNftsOwned(nfts));
    setIsFetching(false);
  };

  useEffect(() => {
    if (amount < MIN_MINT) setAmount(MIN_MINT);
    if (amount > MAX_MINT - nftsOwned.length) setAmount(MAX_MINT);
  }, [amount, nftsOwned.length]);

  useEffect(() => {
    // Fetch price from contract
    getContractConfig()
      .then((p) => {
        setPrice(p.price || 0);
        const timeLeft = p.endDate * 1000 - Date.now();
        if (timeLeft < 0) {
          setSaleTime('Sale ended');
        } else setSaleTime(parseDate(timeLeft));
      })
      .catch((e) => console.log('Error getting price: ', e));
  }, []);

  useEffect(() => {
    // Get NFTs owned by account
    if (nftsOwned.length === 0) {
      fetchNFTs().then((nfts) => {
        dispatch(setNftsOwned(nfts));
        setIsLoading(false);
      });
    } else setIsLoading(false);
  }, [dispatch, nftsOwned.length]);

  const priceFormat = +(price * amount).toFixed(4) == 0 ? 'Free' : (price * amount).toFixed(4) + ' ETH';

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && !nric && <NricInput />}
      {!isLoading && nric && (
        <form className="flex flex-col max-w-[240px]">
          <Image src="/mint.gif" alt="Mint" width={240} height={240} className="rounded-full " />
          <h1 className="text-2xl font-bol text-center mt-6">Mint</h1>
          {nftsOwned.length < MAX_MINT && (
            <>
              <h2 className="text-center font-bold">Price: {priceFormat}</h2>
              {saleTime && <h3 className="text-center mb-6 text-indigo-600">{saleTime}</h3>}{' '}
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
              <Button onClick={refetchNFTs} disabled={isFetching} title="Fetch NFTs" variant="secondary" className="mb-2" />
            </>
          )}
          {nftsOwned.length >= MAX_MINT && (
            <div className="flex flex-col items-center justify-center mt-2">
              <h1 className="text-indigo-700 text-sm text-center font-bold mb-2">
                You can only mint {MAX_MINT} NFTs from this collection
              </h1>
            </div>
          )}
          {nftsOwned.length > 0 && (
            <LinkButton href="/nft" title="View NFTs" variant={nftsOwned.length >= MAX_MINT ? 'primary' : 'secondary'} />
          )}{' '}
          {latestTx && (
            <div className="flex flex-col items-center justify-center mt-2">
              <h1 className="text-xl font-bold">Latest Transaction</h1>
              <a href={`https://sepolia.etherscan.io/tx/${latestTx}`} target="_blank" rel="noreferrer" className="text-blue-500">
                {latestTx}
              </a>
            </div>
          )}
        </form>
      )}
    </>
  );
};

export default MintForm;
