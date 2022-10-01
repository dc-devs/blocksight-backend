import { Injectable } from '@nestjs/common';
import CoinbasePro from './coinbase-pro';
import { ExchangeClient } from './interfaces';
import SecretBox from '../../utils/secret-box';

interface GetExchangeClientOptions {
	userId: number;
	apiKey: string;
	apiSecret: string;
	exchangeId: number;
	apiPassphrase: string;
}

interface ExchangeClients {
	[key: number]: new ({
		userId,
		apiKey,
		apiSecret,
		exchangeId,
		apiPassphrase,
	}) => ExchangeClient;
}

@Injectable()
export class ExchangeClientService {
	exchangeClientClasses: ExchangeClients;

	constructor() {
		this.exchangeClientClasses = {
			2: CoinbasePro,
		};
	}

	getExchangeClient = async ({
		userId,
		apiKey,
		apiSecret,
		exchangeId,
		apiPassphrase,
	}: GetExchangeClientOptions): Promise<ExchangeClient | undefined> => {
		let exchangeClient: ExchangeClient;
		const secretbox = new SecretBox();
		const ExchangeClientClass = this.exchangeClientClasses[exchangeId];

		if (ExchangeClientClass) {
			exchangeClient = new ExchangeClientClass({
				userId,
				exchangeId,
				apiKey: await secretbox.decrypt(apiKey),
				apiSecret: await secretbox.decrypt(apiSecret),
				apiPassphrase: await secretbox.decrypt(apiPassphrase),
			});
		}

		return exchangeClient;
	};
}
