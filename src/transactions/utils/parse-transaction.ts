import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
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

interface Props {
	transaction: any;
	contractAbi: any;
}

const parseTransaction = async ({ transaction, contractAbi }: Props) => {
	const ethersInterface = new ethers.utils.Interface(contractAbi);
	const { data, value } = transaction;

	const parsedTransaction = ethersInterface.parseTransaction({ data, value });
	const { from } = transaction;

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
		type: 'Swap',
		fromAddress: from,
		fromWallet: {
			name: 'MetaMask',
			logoUrl:
				'https://mining-bios.eu/wp-content/uploads/2018/09/metamask-logo.png',
		},
		exchange: {
			name: 'Uniswap',
			contract: 'Uniswap V2',
			conractAdress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
			logoUrl: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=010',
		},
		methodName: name,
		inputs: mappedInputs,
		inputToken: {
			symbol: inputTokenSymbol,
			name: inputTokenName,
			description: inputTokenDescription.en, // en
			logoUrl: inputTokenImage,
		},
		outputToken: {
			symbol: outputTokenSymbol,
			name: outputTokenName,
			description: outputTokenDescription.en, // en
			logoUrl: outputTokenImage,
		},
		transaction,
		parsedTransaction,
	};
};

export default parseTransaction;
