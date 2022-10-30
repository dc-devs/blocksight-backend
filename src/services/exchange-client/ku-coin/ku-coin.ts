import { Symbol } from './enums';
import { KuWebSocket } from './classes';

class KuCoin {
	constructor() {}

	init = async () => {
		const kuWebSocket = new KuWebSocket();

		await kuWebSocket.init({
			subscribeToOrderBook: {
				symbol: Symbol.MATIC_USDT,
			},
			webSocketTimeOut: 5000,
		});
	};
}

export default KuCoin;
