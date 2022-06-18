import { Buffer } from 'buffer';
import { SignTypedDataVersion, signTypedData } from '@metamask/eth-sig-util';

interface IProps {
	data: string | object;
	privateKey: string | Buffer;
}

const signTypedDataMetaMask = ({ data, privateKey }: IProps) => {
	const version = SignTypedDataVersion.V4;
	const typedMessage = typeof data === 'string' ? JSON.parse(data) : data;
	const privateKeyBuffer =
		typeof privateKey === 'string'
			? Buffer.from(privateKey.substring(2, 66), 'hex')
			: privateKey;

	return signTypedData({
		version,
		data: typedMessage,
		privateKey: privateKeyBuffer,
	});
};

export default signTypedDataMetaMask;
