import { BigNumber } from 'bignumber.js';
import { FiatTransfer } from '../dto/models/fiat-transfer.model';
import { FiatTransfersTotals } from '../dto/models/fiat-transfers-totals.model';
import formatToCurrency from '../../token-balances/utils/format-to-currency';

interface IOptions {
	fiatTransfers: FiatTransfer[];
}

const getFiatTransfersTotals = ({
	fiatTransfers,
}: IOptions): FiatTransfersTotals => {
	let totalWithdrawnBn = new BigNumber(0);
	let totalDepositedBn = new BigNumber(0);

	fiatTransfers.forEach((fiatTransfer) => {
		const { type, amount } = fiatTransfer;
		const amountBN = new BigNumber(amount);

		if (type === 'withdraw') {
			totalWithdrawnBn = totalWithdrawnBn.plus(amountBN);
		}

		if (type === 'deposit') {
			totalDepositedBn = totalDepositedBn.plus(amountBN);
		}
	});

	const totalDepositedValue = totalDepositedBn.toFixed(2);
	const totalWithdrawnValue = totalWithdrawnBn.toFixed(2);
	const totalWorkingValue = totalDepositedBn
		.minus(totalWithdrawnBn)
		.toFixed(2);

	const totalDepositedFormatted = formatToCurrency(totalDepositedValue);
	const totalWithdrawnFormatted = formatToCurrency(totalWithdrawnValue);
	const totalWorkingFormatted = formatToCurrency(totalWorkingValue);

	return {
		totalDeposited: {
			value: totalDepositedValue,
			formatted: totalDepositedFormatted,
		},
		totalWithdrawn: {
			value: totalWithdrawnValue,
			formatted: totalWithdrawnFormatted,
		},
		totalWorking: {
			value: totalWorkingValue,
			formatted: totalWorkingFormatted,
		},
	};
};

export default getFiatTransfersTotals;
