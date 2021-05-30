import * as numeral from 'numeral';
import { BigNumber } from 'bignumber.js';

const getTransfersTotalFiatValue = (transfers: any) => {
	let totalTransfers = new BigNumber(0);

	transfers.forEach((deposit) => {
		const { details, amount } = deposit;
		const isSuccessfulDeposit =
			!deposit.canceled_at && deposit.processed_at;
		const isFiatTransfer = !details?.crypto_transaction_hash;

		if (isFiatTransfer && isSuccessfulDeposit) {
			totalTransfers = totalTransfers.plus(amount);
		}
	});

	const string = totalTransfers.toString();
	const formatted = numeral(string).format('$0,0.00');

	return {
		string,
		formatted,
	};
};

export default getTransfersTotalFiatValue;
