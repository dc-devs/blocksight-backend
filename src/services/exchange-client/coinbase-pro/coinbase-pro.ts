import { newCoinbasePro } from './coinbase-pro-client';
import ExchangeClient from '../interfaces/exchange-client.interface';
import { CoinbasePro as CoinbaseProClient } from 'coinbase-pro-node';
import getCoinbaseProFiatTransfers from './get-coinbase-pro-fiat-transfers';
import {
	GetFiatTansfersProps,
	ExchangeClientConstuctorProps,
} from '../interfaces';

class CoinbasePro implements ExchangeClient {
	client: CoinbaseProClient;

	constructor({
		apiKey,
		apiSecret,
		apiPassphrase,
	}: ExchangeClientConstuctorProps) {
		this.client = newCoinbasePro({
			apiKey,
			apiSecret,
			useSandbox: false,
			passphrase: apiPassphrase,
		});
	}

	getFiatTansfers = async ({ transferType }: GetFiatTansfersProps) => {
		return await getCoinbaseProFiatTransfers({ transferType });
	};
}

export default CoinbasePro;
