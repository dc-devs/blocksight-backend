import { Symbol } from './enums';
import { WebSocket } from './classes';

class KuCoin {
	constructor() {}

	init = async () => {
		const webSocket = new WebSocket();

		await webSocket.init({
			subscribeToOrderBook: {
				symbol: Symbol.MATIC_USDT,
			},
			webSocketTimeOut: 5000,
		});
	};
}

export default KuCoin;
