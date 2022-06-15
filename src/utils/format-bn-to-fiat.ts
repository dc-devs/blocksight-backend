import numeral from 'numeral';
import BigNumber from 'bignumber.js';

interface Currencies {
	[key: string]: string;
}

interface Props {
	format: string;
	currency: string;
	bigNumber: BigNumber;
}

const formatBnToFiat = ({ bigNumber, currency, format }: Props): string => {
	const currenies = {
		usd: '$',
	} as Currencies;

	const currencySymbol = currenies[currency];

	return numeral(bigNumber.toString()).format(`${currencySymbol}${format}`);
};

export default formatBnToFiat;
