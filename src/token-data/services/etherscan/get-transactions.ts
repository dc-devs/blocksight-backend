import etherScanProvider from '../ethers/etherscan-provider';

const getTransactions = async (address: string) => {
	const transactions = await etherScanProvider.getHistory(address);

	return transactions;
};

export default getTransactions;
