import Token from '../../interfaces/token-interface';

const weth = {
	symbol: 'weth',
	name: 'WETH',
	description:
		"W-ETH is wrapped ETH but let's start by introducing the players. First, there's Ether token. Ether or ETH is the native currency built on the Ethereum blockchain.\r\nSecond, there are alt tokens. When a dApp (decentralized app) is built off of the Ethereum Blockchain it usually implements it’s own form of Token. Think Augur’s REP Token, or Bancor's BNT Token. Finally the ERC-20 standard. ERC20 is a standard developed after the release of ETH that defines how tokens are transferred and how to keep a consistent record of those transfers among tokens in the Ethereum Network.",

	image: {
		large:
			'https://assets.coingecko.com/coins/images/2518/large/weth.png?1547036627',
		small:
			'https://assets.coingecko.com/coins/images/2518/small/weth.png?1547036627',
		thumb:
			'https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1547036627',
	},
} as Token;

export default weth;
