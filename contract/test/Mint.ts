import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';

// Private fields from the contract:
const contractOwner = '0x002DD3f317CBd269F70704fd0a91280Ccc8DF909';
const tokensReserved = 5;

describe('Mint', function () {
  // Fixture:
  async function deployContract(withBalance: boolean = false) {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Mint = await ethers.getContractFactory('Mint');
    const mint = await Mint.deploy();

    if (withBalance) {
      await network.provider.send('hardhat_setBalance', [await mint.getAddress(), '0x1000']);
    }

    return { mint, owner, otherAccount };
  }

  async function deployContractWithBalance() {
    return deployContract(true);
  }

  describe('Deployment', function () {
    it('Should set the right owner', async function () {
      const { mint, owner } = await loadFixture(deployContract);

      expect(await mint.owner()).to.equal(owner.address);
    });

    it('Should have a set price function', async function () {
      const { mint } = await loadFixture(deployContract);
      await mint.setPrice('900000000000000000');
      expect(await mint.price()).to.equal('900000000000000000');
    });

    it('Should have a set base uri function', async function () {
      const { mint } = await loadFixture(deployContract);
      await mint.setBaseUri('https://example.com/');
      expect(await mint.baseUri()).to.equal('https://example.com/');
    });

    it('Should have a toggle sale function', async function () {
      const { mint } = await loadFixture(deployContract);
      const currentState = await mint.isSaleActive();
      await mint.toggleSale();
      expect(await mint.isSaleActive()).to.equal(!currentState);
    });

    it('Should not be able to mint by default', async function () {
      const { mint } = await loadFixture(deployContract);
      expect(await mint.isSaleActive()).to.equal(false);
      expect(mint.mint(1)).to.be.revertedWith('The sale is paused.');
    });

    it("Should not be able to mint if user can't afford it", async function () {
      const { mint } = await loadFixture(deployContractWithBalance);

      const currentState = await mint.isSaleActive();
      if (!currentState) await mint.toggleSale();
      await mint.setPrice('999999999999999999999');

      await expect(mint.mint(1)).to.be.revertedWith('Insufficient funds.');
    });

    it('Should be able to mint if sale is enabled', async function () {
      const { mint } = await loadFixture(deployContractWithBalance);

      const currentState = await mint.isSaleActive();
      if (!currentState) await mint.toggleSale();
      await mint.setPrice(0);

      await mint.mint(1);
      expect(await mint.totalSupply()).to.equal(1 + tokensReserved);
    });
  });

  describe('Withdrawals', function () {
    it('Should NOT transfer the funds to the deployer', async function () {
      const { mint, owner } = await loadFixture(deployContractWithBalance);

      await expect(mint.withdrawAll()).to.changeEtherBalances([owner, mint], [0, -4095]);
    });

    it('Should transfer the funds to the owner', async function () {
      const { mint } = await loadFixture(deployContractWithBalance);

      await expect(mint.withdrawAll()).to.changeEtherBalances([contractOwner, mint], [4095, -4095]);
    });
  });
});
