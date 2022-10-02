import numeral from 'numeral';

const formatToCurrency = (number: number | string) => {
	return numeral(number).format('$0,000.00');
};

export default formatToCurrency;
