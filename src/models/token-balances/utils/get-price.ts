const getPrice = (quotePrice: number) => {
	let price = 0;

	if (!quotePrice) {
		price = 0;
	} else {
		price = quotePrice.toString().includes('e') ? 0 : quotePrice;
	}

	return price;
};

export default getPrice;
