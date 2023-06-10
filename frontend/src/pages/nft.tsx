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
    if (await window.ethereum.isConnected()) await setWallet(dispatch);

    fetchNFTs().then((nfts) => {
      dispatch(setNftsOwned(nfts));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!window?.ethereum || !window.ethereum.isConnected()) router.push('/');

    handleReload();
  }, [router, dispatch]);

  return (
    <section className="flex flex-col justify-center items-center min-h-screen min-w-screen">
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <div className="grid grid-cols-3">
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
      <div className="flex flex-col min-w-[180px] gap-2 mt-4">
        {!isLoading && <Button onClick={handleReload} title="Refresh" />}
        <Button onClick={() => router.push('/')} title="Back" variant="secondary" />
      </div>
    </section>
  );
};

Nft.getLayout = (page: React.ReactNode) => <PrimaryLayout title="NFT List">{page}</PrimaryLayout>;
export default Nft;
