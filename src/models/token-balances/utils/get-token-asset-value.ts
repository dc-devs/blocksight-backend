import BigNumber from 'bignumber.js';

interface Props {
	balance: string;
	tokenPrice: number;
	contractDecimals: number;
}

const getTokenAssetValue = ({
	balance,
	tokenPrice,
	contractDecimals,
}: Props) => {
	const balanceBN = new BigNumber(balance);
	const balanceETHBN = balanceBN.shiftedBy(-contractDecimals);

	return balanceETHBN.multipliedBy(tokenPrice);
};

export default getTokenAssetValue;
