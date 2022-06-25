import numeral from 'numeral';

const formatToCurrency = (number: number) => {
	return numeral(number).format('$0,000.000');
};

export default formatToCurrency;
