import { Injectable } from '@nestjs/common';
import CoinbasePro from './coinbase-pro';
import { ExchangeClient } from './interfaces';
import SecretBox from '../../utils/secret-box';

interface GetExchangeClientArgs {
	exchangeId: number;
	apiKey: string;
	apiSecret: string;
	apiPassphrase: string;
}

interface ExchangeClients {
	[key: number]: new ({ apiKey, apiSecret, apiPassphrase }) => ExchangeClient;
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
		apiKey,
		apiSecret,
		exchangeId,
		apiPassphrase,
	}: GetExchangeClientArgs) => {
		const secretbox = new SecretBox();
		const ExchangeClientClass = this.exchangeClientClasses[exchangeId];

		return new ExchangeClientClass({
			apiKey: await secretbox.decrypt(apiKey),
			apiSecret: await secretbox.decrypt(apiSecret),
			apiPassphrase: await secretbox.decrypt(apiPassphrase),
		});
	};
}
