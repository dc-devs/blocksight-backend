import { BigNumber } from 'bignumber.js';

const format = {
	prefix: '',
	decimalSeparator: '.',
	groupSeparator: ',',
	groupSize: 3,
	secondaryGroupSize: 0,
	fractionGroupSeparator: ' ',
	fractionGroupSize: 0,
	suffix: '',
};

interface IFormatBalanceProps {
	balance: string;
	contractDecimals: number;
}

const formatBalance = ({ balance, contractDecimals }: IFormatBalanceProps) => {
	BigNumber.config({ FORMAT: format });

	const balanceBN = new BigNumber(balance);
	const tokenBalanceAmount = balanceBN
		.shiftedBy(-contractDecimals)
		.toFormat(4);
	const formattedBalance = tokenBalanceAmount.toString();

	return formattedBalance;
};

export default formatBalance;
