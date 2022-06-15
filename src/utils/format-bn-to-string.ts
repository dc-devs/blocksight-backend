import numeral from 'numeral';
import BigNumber from 'bignumber.js';

interface Props {
	format: string;
	bigNumber: BigNumber;
}

const formatBnToString = ({ bigNumber, format }: Props) => {
	return numeral(bigNumber.toString()).format(format);
};

export default formatBnToString;
