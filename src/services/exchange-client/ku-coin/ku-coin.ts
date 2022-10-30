// import { Symbol } from './enums';
import { WebSocket } from './classes';

class KuCoin {
	constructor() {}

	init = async () => {
		const webSocket = new WebSocket();
		await webSocket.init({ webSocketTimeOut: 5000 });

		// webSocket.subscribeToOrderBook({ symbol: Symbol.MATIC_USDT });
	};
}

export default KuCoin;
