import Button from '@/elements/buttons/Button';
import NftCard from '@/elements/card/NftCard';
import Spinner from '@/elements/loaders/Spinner';
import { setWallet } from '@/helpers/auth';
import { fetchNFTs } from '@/helpers/contract';
import { setNftsOwned } from '@/redux/slices/nftSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryLayout from 'src/components/layouts/PrimaryLayout';
import { PageWithLayout } from 'src/types/page';

const Nft: PageWithLayout = () => {
  const { nftsOwned } = useSelector((state: RootState) => state.nft);
  const [isLoading, setIsLoading] = useState<boolean>(nftsOwned.length == 0);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleReload = async () => {
    setIsLoading(true);
    if (await window.ethereum.isConnected()) await setWallet(dispatch);

    fetchNFTs().then((nfts) => {
      dispatch(setNftsOwned(nfts));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!window?.ethereum || !window.ethereum.isConnected()) router.push('/');

    if (nftsOwned.length === 0) handleReload();
  }, [router, dispatch]);

  return (
    <section className="flex flex-col items-center min-h-screen min-w-screen">
      <h1 className="font-bold text-xl mt-8"> Your NFTs</h1>
      <div className="grid grid-cols-2 gap-2 my-4">
        <Button onClick={() => router.push('/')} title="Back" variant="secondary" />
        <Button onClick={handleReload} title="Refresh" disabled={isLoading} />
      </div>
      {isLoading && (
        <div className="flex flex-1 justify-center items-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {nftsOwned.map((nft) => (
              <NftCard nft={nft} key={nft.dna} />
            ))}
          </div>

          {nftsOwned.length == 0 && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold">You don&apos;t have any NFTs yet</h1>
            </div>
          )}
        </>
      )}
    </section>
  );
};

Nft.getLayout = (page: React.ReactNode) => <PrimaryLayout title="NFT List">{page}</PrimaryLayout>;
export default Nft;
