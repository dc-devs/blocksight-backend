import { Injectable } from '@nestjs/common';
import getTokenBalances from './utils/get-token-balances';
import catagorizeTokenBalances from './utils/catagorize-token-balances';
import getTotalTokenBalanceValue from './utils/get-total-token-balance-value';

interface ITokenBalancesInput {
	address: string;
	currency: string;
	filter: string;
}

// Design: https://www.lambdatest.com/
// Turn NFT Query to False and this is a much faster response..
// Can we use this each time w/out saving to db? What is faster?
@Injectable()
export class TokenBalancesService {
	async getTokenBalances({ filter, address, currency }: ITokenBalancesInput) {
		// For Ethereum
		//--------------------------
		const ethereumTokenBalances = await getTokenBalances({
			address,
			currency,
			filter,
			chainId: '1',
		});
		// ---------------------------

		// // For Polygon
		// //--------------------------
		const polygonTokenBalances = await getTokenBalances({
			address,
			currency,
			filter,
			chainId: '137',
		});
		// // ---------------------------

		const tokenBalances = [
			...ethereumTokenBalances,
			...polygonTokenBalances,
		];

		const {
			nftBalances,
			scamTokenBalances,
			hiddenTokenBalances,
			displayTokenBalances,
		} = await catagorizeTokenBalances(tokenBalances);

		const totalValue = getTotalTokenBalanceValue({
			currency,
			tokenBalances: [...displayTokenBalances, ...nftBalances],
		});

		const totalValueTokens = getTotalTokenBalanceValue({
			currency,
			tokenBalances: displayTokenBalances,
		});

		const totalValueNfts = getTotalTokenBalanceValue({
			currency,
			tokenBalances: nftBalances,
		});

		return {
			totalValue,
			tokens: {
				totalValue: totalValueTokens,
				balances: displayTokenBalances,
			},
			nfts: {
				totalValue: totalValueNfts,
				balances: nftBalances,
			},
			hidden: {
				totalValue: {
					value: '0',
					formatted: '$0.00',
				},
				balances: hiddenTokenBalances,
			},
			scam: {
				totalValue: {
					value: '0',
					formatted: '$0.00',
				},
				balances: scamTokenBalances,
			},
		};

		// return {
		// 	// New Model
		// 	networks: [
		// 		{
		// 			chainId: '1',
		// 			chainName: 'Mainnet',
		// 			name: 'Ethereum',
		// 			rpcUrl: 'https://mainnet.infura.io/v3/',
		// 			symbol: 'ETH',
		// 			blockExplorerUrl: 'https://etherscan.io',
		// 			logoUrl:
		// 				'https://assets.debank.com/static/media/eth.8ab4ac7c.svg',
		// 		},
		// 		{
		// 			chainId: '137',
		// 			chainName: 'Mainnet',
		// 			name: 'Polygon',
		// 			rpcUrl: 'https://polygon-rpc.com/',
		// 			symbol: 'MATIC',
		// 			blockExplorerUrl: 'https://polygonscan.com/',
		// 			logoUrl:
		// 				'https://assets.debank.com/static/media/polygon.23445189.svg',
		// 		},
		// 	],
		// 	totalValue: {
		// 		value: '50219.8654',
		// 		formatted: '50,219.87',
		// 	},
		// 	tokens: {
		// 		totalValue: {
		// 			value: '50219.8654',
		// 			formatted: '50,219.87',
		// 		},
		// 		balances: [
		// 			{
		// 				name: 'Reserve Rights',
		// 				symbol: 'RSR',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x8762db106b2c2a0bccb3a80d1ed41273552616e8.png',
		// 				contractAddress:
		// 					'0x8762db106b2c2a0bccb3a80d1ed41273552616e8',
		// 				balance: '3,453,116.3801',
		// 				totalValue: {
		// 					value: '43586.984',
		// 					formatted: '$43,586.984',
		// 				},
		// 				price: {
		// 					value: '0.012622506',
		// 					formatted: '$0.013',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Ether',
		// 				symbol: 'ETH',
		// 				logoUrl:
		// 					'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
		// 				contractAddress:
		// 					'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		// 				balance: '1.0666',
		// 				totalValue: {
		// 					value: '1273.7184',
		// 					formatted: '$1,273.718',
		// 				},
		// 				price: {
		// 					value: '1194.2152',
		// 					formatted: '$1,194.215',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: null,
		// 			},
		// 			{
		// 				name: 'NFT Champions',
		// 				symbol: 'CHAMP',
		// 				logoUrl:
		// 					'https://anima-uploads.s3.amazonaws.com/projects/629efb3cdae8696dc8e149cc/releases/62b681ffcf20b893e0d9fe69/img/layer-19-2@1x.png',
		// 				contractAddress:
		// 					'0x8f9e8e833a69aa467e42c46cca640da84dd4585f',
		// 				balance: '251,876.2064',
		// 				totalValue: {
		// 					value: '5359.163',
		// 					formatted: '$5,359.163',
		// 				},
		// 				price: {
		// 					value: '0.021276973',
		// 					formatted: '$0.021',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '8',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Matic Token',
		// 				symbol: 'MATIC',
		// 				logoUrl:
		// 					'https://assets.debank.com/static/media/polygon.23445189.svg',
		// 				contractAddress:
		// 					'0x0000000000000000000000000000000000001010',
		// 				balance: '22822766569899931926',
		// 				totalValue: {
		// 					value: '.05337338',
		// 					formatted: '$0.05',
		// 				},
		// 				price: {
		// 					value: '0.5748996',
		// 					formatted: '$0.575',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 		],
		// 	},
		// 	nfts: {
		// 		totalValue: {
		// 			value: '0',
		// 			formatted: '0.00',
		// 		},
		// 		balances: [
		// 			{
		// 				type: 'nft',
		// 				name: 'ENS: Base Registrar',
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				symbol: 'ENS',
		// 				isNft: true,
		// 				chainId: '1',
		// 				balance: '0.0000',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85.png',
		// 				decimals: '0',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				supportsErc: ['erc20'],
		// 				contractAddress:
		// 					'0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
		// 			},
		// 			{
		// 				type: 'nft',
		// 				name: 'Uniswap V3 Positions NFT-V1',
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				symbol: 'UNI-V3-POS',
		// 				isNft: true,
		// 				chainId: '1',
		// 				balance: '4.0000',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0xc36442b4a4522e871399cd717abdd847ab11fe88.png',
		// 				decimals: '0',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				supportsErc: ['erc20', 'erc721'],
		// 				contractAddress:
		// 					'0xc36442b4a4522e871399cd717abdd847ab11fe88',
		// 			},
		// 		],
		// 	},
		// 	scam: {
		// 		totalValue: {
		// 			value: '0',
		// 			formatted: '$0.00',
		// 		},
		// 		balances: [
		// 			{
		// 				name: 'A68.net',
		// 				symbol: 'A68.NET',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x1412eca9dc7daef60451e3155bb8dbf9da349933.png',
		// 				contractAddress:
		// 					'0x1412eca9dc7daef60451e3155bb8dbf9da349933',
		// 				balance: '93,989.2800',
		// 				totalValue: {
		// 					value: '56300.707',
		// 					formatted: '$56,300.707',
		// 				},
		// 				price: {
		// 					value: '0.599012',
		// 					formatted: '$0.599',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'ApeCoin.com.de',
		// 				symbol: 'APECOIN.COM.DE',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0xefa1aa32976e3f19da5e649fdeec77b72469bfb3.png',
		// 				contractAddress:
		// 					'0xefa1aa32976e3f19da5e649fdeec77b72469bfb3',
		// 				balance: '10.0000',
		// 				totalValue: {
		// 					value: '4287939120000000',
		// 					formatted: '$4,287,939,120,000,000.000',
		// 				},
		// 				price: {
		// 					value: '428793898000000',
		// 					formatted: '$428,793,898,000,000.000',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Stepn.fitness',
		// 				symbol: 'GMT',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x7bfe43e475ebea07fa03337da551e18502c8793c.png',
		// 				contractAddress:
		// 					'0x7bfe43e475ebea07fa03337da551e18502c8793c',
		// 				balance: '245.3000',
		// 				totalValue: {
		// 					value: '1392421550000000',
		// 					formatted: '$1,392,421,550,000,000.000',
		// 				},
		// 				price: {
		// 					value: '5676402700000',
		// 					formatted: '$5,676,402,700,000.000',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'STEPN.me',
		// 				symbol: 'STEPN.ME',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0xc229cc41f523f165436f2d52c62b80602cd76f51.png',
		// 				contractAddress:
		// 					'0xc229cc41f523f165436f2d52c62b80602cd76f51',
		// 				balance: '10.0000',
		// 				totalValue: {
		// 					value: '11700803700000',
		// 					formatted: '$11,700,803,700,000.000',
		// 				},
		// 				price: {
		// 					value: '1170080400000',
		// 					formatted: '$1,170,080,400,000.000',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Minereum Polygon',
		// 				symbol: 'MNEP',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x0b91b07beb67333225a5ba0259d55aee10e3a578.png',
		// 				contractAddress:
		// 					'0x0b91b07beb67333225a5ba0259d55aee10e3a578',
		// 				balance: '300,000.0000',
		// 				totalValue: {
		// 					value: '4210.231',
		// 					formatted: '$4,210.231',
		// 				},
		// 				price: {
		// 					value: '0.014034103',
		// 					formatted: '$0.014',
		// 				},
		// 				type: 'cryptocurrency',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '8',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'RicheSwap.io',
		// 				symbol: 'RICHESWAP',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x02677c45fa858b9ffec24fc791bf72cdf4a8a8df.png',
		// 				contractAddress:
		// 					'0x02677c45fa858b9ffec24fc791bf72cdf4a8a8df',
		// 				balance: '91,968,523,936.4303',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'XTOKEN',
		// 				symbol: 'XTOKEN',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x8764bf0377fac982a5fc62e04c9765e37a113554.png',
		// 				contractAddress:
		// 					'0x8764bf0377fac982a5fc62e04c9765e37a113554',
		// 				balance: '1.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'nft',
		// 				isNft: true,
		// 				chainId: '137',
		// 				decimals: '0',
		// 				supportsErc: ['erc20', 'erc721'],
		// 			},
		// 			{
		// 				name: 'smartdiving.game',
		// 				symbol: 'SMARTDIVING.GAME',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0xf5f941cccf571a8bddd4420af269427394aed8fe.png',
		// 				contractAddress:
		// 					'0xf5f941cccf571a8bddd4420af269427394aed8fe',
		// 				balance: '1.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'nft',
		// 				isNft: true,
		// 				chainId: '137',
		// 				decimals: '0',
		// 				supportsErc: ['erc20', 'erc721'],
		// 			},
		// 			{
		// 				name: 'Meowximus',
		// 				symbol: 'MEOWXIMUS',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x043a0d3e1c7dde9c4e9d7a768992e4451e5a3a0e.png',
		// 				contractAddress:
		// 					'0x043a0d3e1c7dde9c4e9d7a768992e4451e5a3a0e',
		// 				balance: '1.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'nft',
		// 				isNft: true,
		// 				chainId: '137',
		// 				decimals: '0',
		// 				supportsErc: ['erc1155', 'erc20'],
		// 			},
		// 			{
		// 				name: 'The High Apes Club - World Pass',
		// 				symbol: 'THCWP',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x23a8c2ce858b2e66222567923641cb6417994caf.png',
		// 				contractAddress:
		// 					'0x23a8c2ce858b2e66222567923641cb6417994caf',
		// 				balance: '1.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'nft',
		// 				isNft: true,
		// 				chainId: '137',
		// 				decimals: '0',
		// 				supportsErc: ['erc1155', 'erc20'],
		// 			},
		// 			{
		// 				name: 'OpenSea Collections',
		// 				symbol: 'OPENSTORE',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x2953399124f0cbb46d2cbacd8a89cf0599974963.png',
		// 				contractAddress:
		// 					'0x2953399124f0cbb46d2cbacd8a89cf0599974963',
		// 				balance: 'NaN',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'nft',
		// 				isNft: true,
		// 				chainId: '137',
		// 				decimals: '0',
		// 				supportsErc: [],
		// 			},
		// 			{
		// 				name: 'THC - Public Invite',
		// 				symbol: 'THCP',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/137/0x7ac04336b214ea81546685d2bf27222bc4ee02ea.png',
		// 				contractAddress:
		// 					'0x7ac04336b214ea81546685d2bf27222bc4ee02ea',
		// 				balance: 'NaN',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'nft',
		// 				isNft: true,
		// 				chainId: '137',
		// 				decimals: '0',
		// 				supportsErc: [],
		// 			},
		// 		],
		// 	},
		// 	hidden: {
		// 		totalValue: {
		// 			value: '0',
		// 			formatted: '$0.00',
		// 		},
		// 		balances: [
		// 			{
		// 				name: 'RevolutionPopuli ERC20 Token',
		// 				symbol: 'RVP',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x17ef75aa22dd5f6c2763b8304ab24f40ee54d48a.png',
		// 				contractAddress:
		// 					'0x17ef75aa22dd5f6c2763b8304ab24f40ee54d48a',
		// 				balance: '0.2047',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0.01374779',
		// 					formatted: '$0.014',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Injective Token',
		// 				symbol: 'INJ',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0xe28b3b32b6c345a34ff64674606124dd5aceca30.png',
		// 				contractAddress:
		// 					'0xe28b3b32b6c345a34ff64674606124dd5aceca30',
		// 				balance: '0.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '1.4061762',
		// 					formatted: '$1.406',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Governor',
		// 				symbol: 'GDAO',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x515d7e9d75e2b76db60f8a051cd890eba23286bc.png',
		// 				contractAddress:
		// 					'0x515d7e9d75e2b76db60f8a051cd890eba23286bc',
		// 				balance: '0.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0.123237915',
		// 					formatted: '$0.123',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Keanu Inu',
		// 				symbol: 'KEANU',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x106552c11272420aad5d7e94f8acab9095a6c952.png',
		// 				contractAddress:
		// 					'0x106552c11272420aad5d7e94f8acab9095a6c952',
		// 				balance: '11,646,490.7374',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '9',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Tether USD',
		// 				symbol: 'USDT',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
		// 				contractAddress:
		// 					'0xdac17f958d2ee523a2206206994597c13d831ec7',
		// 				balance: '0.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '1.000439',
		// 					formatted: '$1.000',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '6',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Matic Token',
		// 				symbol: 'MATIC',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png',
		// 				contractAddress:
		// 					'0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
		// 				balance: '0.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '0.5748996',
		// 					formatted: '$0.575',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '1',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: 'Wrapped Ether',
		// 				symbol: 'WETH',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png',
		// 				contractAddress:
		// 					'0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		// 				balance: '0.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '1194.0457',
		// 					formatted: '$1,194.046',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '18',
		// 				supportsErc: ['erc20'],
		// 			},
		// 			{
		// 				name: '(PoS) Tether USD',
		// 				symbol: 'USDT',
		// 				logoUrl:
		// 					'https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
		// 				contractAddress:
		// 					'0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
		// 				balance: '0.0000',
		// 				totalValue: {
		// 					value: '0',
		// 					formatted: '$0.000',
		// 				},
		// 				price: {
		// 					value: '1.000439',
		// 					formatted: '$1.000',
		// 				},
		// 				type: 'dust',
		// 				isNft: false,
		// 				chainId: '137',
		// 				decimals: '6',
		// 				supportsErc: ['erc20'],
		// 			},
		// 		],
		// 	},
		// };
	}
}
