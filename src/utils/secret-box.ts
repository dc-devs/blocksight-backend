import { secretbox, randomBytes } from 'tweetnacl';
import {
	decodeUTF8,
	encodeUTF8,
	encodeBase64,
	decodeBase64,
} from 'tweetnacl-util';

class SecretBox {
	secretBoxKey: string;

	constructor() {
		console.log('SECRET_BOX_KEY', process.env.SECRET_BOX_KEY);
	}

	getSecretBoxKey = async () => {
		return process.env.SECRET_BOX_KEY;
	};

	newNonce = () => randomBytes(secretbox.nonceLength);

	encrypt = async (json) => {
		const key = await this.getSecretBoxKey();
		const keyUint8Array = decodeBase64(key);

		const nonce = this.newNonce();
		const messageUint8 = decodeUTF8(JSON.stringify(json));
		const box = secretbox(messageUint8, nonce, keyUint8Array);

		const fullMessage = new Uint8Array(nonce.length + box.length);
		fullMessage.set(nonce);
		fullMessage.set(box, nonce.length);

		const base64FullMessage = encodeBase64(fullMessage);
		return base64FullMessage;
	};

	decrypt = async (messageWithNonce) => {
		const key = await this.getSecretBoxKey();
		const keyUint8Array = decodeBase64(key);
		const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
		const nonce = messageWithNonceAsUint8Array.slice(
			0,
			secretbox.nonceLength,
		);
		const message = messageWithNonceAsUint8Array.slice(
			secretbox.nonceLength,
			messageWithNonce.length,
		);

		const decrypted = secretbox.open(message, nonce, keyUint8Array);

		if (!decrypted) {
			throw new Error('Could not decrypt message');
		}

		const base64DecryptedMessage = encodeUTF8(decrypted);

		return JSON.parse(base64DecryptedMessage);
	};
}

export default SecretBox;
