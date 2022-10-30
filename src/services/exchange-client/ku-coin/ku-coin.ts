import { Symbol } from './enums';
import { KuWebSocket } from './classes';

class KuCoin {
	constructor() {}

	init = async () => {
		const kuWebSocket = new KuWebSocket();

		// TODO: Enhancement:
		// Multiple Subscriptions
		// Multiple symbols Orderbook {symbol},{symbol}
		// subscriptions: {
		// 	orderBook: {
		// 	 symbols: {symbol},{symbol}
		// 	},
		// 	execution: {
		// 		symbols: {symbol},{symbol}
		// 	}
		// }

		await kuWebSocket.init({
			subscribeToOrderBook: {
				symbol: Symbol.MATIC_USDT,
			},
			webSocketTimeOut: 5000,
		});
	};
}

export default KuCoin;
