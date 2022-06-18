import crypto from 'crypto';
import { ethers } from 'ethers';

const generateWallet = () => {
	const id = crypto.randomBytes(32).toString('hex');
	const privateKey = `0x${id}`;
	const wallet = new ethers.Wallet(privateKey);

	return {
		privateKey,
		address: wallet.address.toLowerCase(),
	};
};

export default generateWallet;
