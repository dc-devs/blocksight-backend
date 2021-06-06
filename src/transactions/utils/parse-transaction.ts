import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import uniSwapAbi from '../../abi/uniswap/uniswap-v2-router-abi';
import getTokenData from '../../services/coingecko/get-token-data';
// https://ethereum.stackexchange.com/questions/78815/ethers-js-recover-public-key-from-contract-deployment-via-v-r-s-values

interface Input {
	type: string;
	value: string | BigNumber | string[];
}

interface UniswapInputs {
	amountOutMin: Input;
	path: Input;
	to: Input;
	deadline: Input;
}

const parseTransaction = async (transaction) => {
	const ethersInterface = new ethers.utils.Interface(uniSwapAbi);
	const { data, value } = transaction;

	const parsedTransaction = ethersInterface.parseTransaction({ data, value });
	console.log('--- transaction ----');
	console.log(transaction);
	const { from } = transaction;

	console.log('--- parsedTransaction ----');
	console.log(parsedTransaction);

	const { args, name, functionFragment } = parsedTransaction;
	const { inputs } = functionFragment;
	const mappedInputs = {} as UniswapInputs;

	inputs.forEach((input, index) => {
		const value = args[index];
		const { name, type } = input;

		mappedInputs[name] = { type, value };
	});

	const paths = mappedInputs.path.value;

	const inputTokenAddress = paths[0];
	const outputTokenAddress = paths[1];

	const inputTokenData = await getTokenData(inputTokenAddress);
	const outputTokenData = await getTokenData(outputTokenAddress);

	const {
		symbol: inputTokenSymbol,
		name: inputTokenName,
		description: inputTokenDescription, // en
		image: inputTokenImage,
	} = inputTokenData;

	const {
		symbol: outputTokenSymbol,
		name: outputTokenName,
		description: outputTokenDescription, // en
		image: outputTokenImage,
	} = outputTokenData;

	return {
		fromWallet: from,
		type: 'swap',
		contract: 'Uniswap V2: Router 2',
		conractAdress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
		exhangeLogoUrl:
			'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=010',
		methodName: name,
		inputs: mappedInputs,
		inputToken: {
			symbol: inputTokenSymbol,
			name: inputTokenName,
			description: inputTokenDescription.en, // en
			image: inputTokenImage,
		},
		outputToken: {
			symbol: outputTokenSymbol,
			name: outputTokenName,
			description: outputTokenDescription.en, // en
			image: outputTokenImage,
		},
	};
};

export default parseTransaction;
