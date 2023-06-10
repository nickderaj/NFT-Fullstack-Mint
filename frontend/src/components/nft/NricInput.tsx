import { createUser, fetchUser } from '@/api/user.api';
import FormButton from '@/elements/buttons/FormButton';
import { setNric } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// @ts-ignore: this file isn't typed
import NRIC from 'singapore-nric';

const NricInput = () => {
  const [buttonText, setButtonText] = useState<string>('Proceed');
  const [nricInput, setNricInput] = useState<string>('');
  const { walletAddress } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const handleUpdateNric = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (NRIC.Validate(nricInput) === false) return toast('Invalid NRIC!', { type: 'error' });

      setButtonText('Loading...');
      const res = (await createUser(walletAddress, nricInput)) as AxiosResponse;
      if (res?.status === 200) dispatch(setNric(nricInput));
      setButtonText('Proceed');
    } catch (error) {
      console.log('error: ', error);
      setButtonText('Proceed');
    }
  };

  useEffect(() => {
    // Check if user already exists
    fetchUser(walletAddress)
      .then((res) => {
        if (res?.data?.user?.nric) dispatch(setNric(res.data.user.nric));
      })
      .catch((err) => console.error('err: ', err));
  }, [dispatch, walletAddress]);

  return (
    <form className="flex flex-col max-w-[240px]" onSubmit={handleUpdateNric}>
      <Image src="/mint.gif" alt="Mint" width={240} height={240} className="rounded-full " />
      <h1 className="text-2xl font-bol text-center mt-6">Input your nric:</h1>
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 my-2"
        value={nricInput}
        onChange={(e) => setNricInput(e.target.value)}
        placeholder='e.g. "S1234567A"'
      />
      <FormButton onClick={handleUpdateNric} title={buttonText} disabled={buttonText !== 'Proceed'} className="mb-2" />
    </form>
  );
};

export default NricInput;
