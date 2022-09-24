import { coinbaseProClient } from './coinbase-pro-client';
import getAllFiatDeposits from './get-all-coinbase-pro-fiat-deposits';
import getAllFiatWithdrawls from './get-all-coinbase-pro-fiat-withdrawls';

// TODO: Add All Pages (If that is an issue?)
const getAllCoinbaseProFiatTransfers = async () => {
	const profiles = await coinbaseProClient.rest.profile.listProfiles();

	const allCoinbaseProFiatTransfers = await Promise.all([
		getAllFiatDeposits({ profiles }),
		getAllFiatWithdrawls({ profiles }),
	]).then((allCoinbaseProFiatTransfers) => {
		return allCoinbaseProFiatTransfers.flat();
	});

	return allCoinbaseProFiatTransfers;
};

export default getAllCoinbaseProFiatTransfers;
