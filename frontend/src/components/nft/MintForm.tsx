import { MAX_MINT, MIN_MINT } from '@/constants/contract.constants';
import Button from '@/elements/buttons/Button';
import { getPrice, mint } from '@/helpers/contract';
import { MouseEvent, useEffect, useState } from 'react';

const MintForm: React.FC = () => {
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState<number>(0);

  const handleMint = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      let currAmount = amount;
      if (currAmount < MIN_MINT) currAmount = MIN_MINT;
      if (currAmount > MAX_MINT) currAmount = MAX_MINT;

      await mint(currAmount);
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

  useEffect(() => {
    if (amount < MIN_MINT) setAmount(MIN_MINT);
    if (amount > MAX_MINT) setAmount(MAX_MINT);
  }, [amount]);

  useEffect(() => {
    getPrice()
      .then((p) => setPrice(p || 0))
      .catch((e) => console.log('Error getting price: ', e));
  }, []);

  return (
    <form className="flex flex-col max-w-[240px]">
      <h1 className="text-2xl font-bol text-center">Mint</h1>
      <h2 className="text-center">Price: {(price * amount).toFixed(4)} ETH</h2>
      <div className="grid grid-cols-3 items-center justify-center">
        <button onClick={handleDecrement} className="text-2xl font-bold">
          -
        </button>
        <input type="number" className="text-center" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
        <button onClick={handleIncrement} className="text-2xl font-bold">
          +
        </button>
      </div>
      <Button onClick={handleMint} title="Mint" />
    </form>
  );
};

export default MintForm;
