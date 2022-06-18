import Web3 from 'web3';
import {
	SignTypedDataVersion,
	recoverTypedSignature,
} from '@metamask/eth-sig-util';

interface IProps {
	data: string | object;
	signature: string;
	address: string;
}

const isSignedTypedDataMetaMask = ({ data, signature, address }: IProps) => {
	const version = SignTypedDataVersion.V4;
	const typedMessage = typeof data === 'string' ? JSON.parse(data) : data;

	const recoveredAddress = recoverTypedSignature({
		version,
		signature,
		data: typedMessage,
	});

	const adressIsAddress = Web3.utils.isAddress(address);
	const recoveredAddressIsAddress = Web3.utils.isAddress(recoveredAddress, 1);

	return adressIsAddress === recoveredAddressIsAddress;
};

export default isSignedTypedDataMetaMask;
