interface Price {
	number: number;
	formatted: string;
}

interface TotalValue {
	number: number;
	formatted: string;
}

interface TokenBalance {
	name: string;
	price: Price;
	symbol: string;
	balance: string;
	logoUrl: string;
	totalValue: TotalValue;
	contractAddress: string;
}

export default TokenBalance;