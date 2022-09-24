import { newCoinbasePro } from './coinbase-pro-client';
import { ExchangeClientConstuctorOptions } from '../interfaces';
import getAllCoinbaseProFiatTransfers from './get-all-coinbase-pro-fiat-transfers';
import ExchangeClient from '../interfaces/exchange-client.interface';
import { CoinbasePro as CoinbaseProClient } from 'coinbase-pro-node';
import convertCoinbaseProTransfersToFiatTransfers from './convert-coinbase-pro-transfers-to-fiat-transfers';

class CoinbasePro implements ExchangeClient {
	userId: number;
	exchangeId: number;
	client: CoinbaseProClient;

	constructor({
		userId,
		apiKey,
		apiSecret,
		exchangeId,
		apiPassphrase,
	}: ExchangeClientConstuctorOptions) {
		this.userId = userId;
		this.exchangeId = exchangeId;

		this.client = newCoinbasePro({
			apiKey,
			apiSecret,
			useSandbox: false,
			passphrase: apiPassphrase,
		});
	}

	getAllExchangeFiatTansfers = async () => {
		return await getAllCoinbaseProFiatTransfers();
	};

	getAllFiatTansfers = async () => {
		const transfers = await this.getAllExchangeFiatTansfers();
		const allFiatTransfers =
			await convertCoinbaseProTransfersToFiatTransfers({
				transfers,
				userId: this.userId,
				exchangeId: this.exchangeId,
			});

		return allFiatTransfers;
	};
}

export default CoinbasePro;
