import { Symbol } from './enums';
import { KuWebSocket } from './classes';

class KuCoin {
	constructor() {}

	init = async () => {
		const kuWebSocket = new KuWebSocket();

		await kuWebSocket.init({
			subscriptions: {
				orderBook: {
					symbol: Symbol.MATIC_USDT,
				},
				matchExecution: {
					symbol: Symbol.MATIC_USDT,
				},
			},
			webSocketTimeOut: 25000,
		});
	};
}

export default KuCoin;
