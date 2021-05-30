export interface Token {
	symbol: string;
	name: string;
	decimals: number;
	address: string;
}

export interface Tokens {
	[key: string]: Token;
}

const tokens = {
	RSR: {
		symbol: 'RSR',
		name: 'Reserve Rights',
		decimals: 18,
		address: '0x8762db106B2c2A0bccB3A80d1Ed41273552616E8',
	},
	ETH: {
		symbol: 'ETH',
		name: 'Ether',
		decimals: 18,
		address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
	},
	WETH: {
		symbol: 'WETH',
		name: 'Wrapped Ether',
		decimals: 18,
		address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
	},
	DAI: {
		symbol: 'DAI',
		name: 'Dai Stablecoin',
		decimals: 18,
		address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
	},
	WBTC: {
		symbol: 'WBTC',
		name: 'Wrapped BTC',
		decimals: 8,
		address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
	},
	UNI: {
		symbol: 'UNI',
		name: 'Uniswap',
		decimals: 18,
		address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
	},
} as Tokens;

export default tokens;
