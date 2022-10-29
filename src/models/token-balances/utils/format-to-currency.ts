import numeral from 'numeral';

const formatToCurrency = (number: number | string, decimals?: string) => {
	let formatted = '';

	if (decimals) {
		formatted = numeral(number).format(`$0,000${decimals}`);
	} else {
		formatted = numeral(number).format('$0,000.00');
	}

	return formatted;
};

export default formatToCurrency;
