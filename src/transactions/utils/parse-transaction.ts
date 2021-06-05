import { ethers } from 'ethers';
import uniSwapAbi from '../../abi/uniswap/uniswap-v2-router-abi';
// https://ethereum.stackexchange.com/questions/78815/ethers-js-recover-public-key-from-contract-deployment-via-v-r-s-values
const parseTransaction = (transaction) => {
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

	const mappedInputs = inputs.map((input, index) => {
		const value = args[index];
		const { name, type } = input;

		return { name, type, value };
	});

	console.log(mappedInputs);

	return {
		fromWallet: from,
		contract: 'uniswap-v2-router',
		methodName: name,
		inputs: mappedInputs,
	};
};

export default parseTransaction;
