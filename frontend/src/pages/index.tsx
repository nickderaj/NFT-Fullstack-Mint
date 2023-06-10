import MintForm from '@/components/nft/MintForm';
import { connectWallet, setWallet } from '@/helpers/auth';
import { setWalletAddress } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryLayout from 'src/components/layouts/PrimaryLayout';
import Button from 'src/elements/buttons/Button';
import { PageWithLayout } from 'src/types/page';

const Home: PageWithLayout = () => {
  const { walletAddress } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleConnect = () => {
    if (!window?.ethereum) return;
    connectWallet(dispatch);
  };

  useEffect(() => {
    if (!window?.ethereum) return;

    if (window.ethereum.isConnected()) setWallet(dispatch);
    window.ethereum.on('disconnect', () => dispatch(setWalletAddress('')));
    window.ethereum.on('accountsChanged', () => connectWallet(dispatch));
  }, [dispatch]);

  return (
    <>
      <section className="flex flex-col justify-center items-center min-h-screen min-w-screen">
        {!walletAddress && <Button onClick={handleConnect} title="Connect Wallet" />}
        {walletAddress && <MintForm />}
      </section>
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => <PrimaryLayout title="NFT Minting">{page}</PrimaryLayout>;
export default Home;
