import fs from 'fs';
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import Logger from '../../../utils/logger';
import { Topic, Symbol, Channel } from './enums';
import { Level2Data } from './classes';
import {
	getFilePath,
	getFileName,
	getPingMessage,
	getSubscriptionMessage,
	getWebsocketConnectData,
} from './utils';

class KuCoin {
	constructor() {}

	init = async () => {
		const level2Data = new Level2Data();

		// Global Vars
		const connectId = uuidv4();
		const topic = Topic.Level2;
		const symbol = Symbol.MATIC_USDT;
		const channel = Channel.Public;
		const fileTimestamp = Date.now();

		const subscribeToLevel2Data = getSubscriptionMessage({
			topic,
			symbol,
			channel,
			connectId,
		});

		const pingMessage = getPingMessage({ connectId });

		const fileNameRaw = getFileName({
			topic,
			symbol,
			channel,
			name: 'raw',
			timestamp: fileTimestamp,
		});
		const filePathRaw = getFilePath({ fileName: fileNameRaw });

		const fileNameSequences = getFileName({
			topic,
			symbol,
			channel,
			name: 'sequences',
			timestamp: fileTimestamp,
		});
		const filePathSequences = getFilePath({ fileName: fileNameSequences });

		const { connectionUrl, pingInterval } = await getWebsocketConnectData({
			connectId,
		});

		var ws = new WebSocket(connectionUrl);

		ws.onopen = () => {
			Logger.debug('[KuCoin WebSocket] Connection established');

			ws.send(pingMessage);
			ws.send(subscribeToLevel2Data);

			setTimeout(() => {
				ws.close();
			}, 5000);

			setInterval(async () => {
				ws.send(pingMessage);
			}, pingInterval);
		};

		ws.onmessage = (event) => {
			const message = event.data;

			if (typeof message === 'string') {
				if (message.includes('"id"')) {
					Logger.debug('[KuCoin WebSocket] Message:', message);
				}

				if (message.includes('error')) {
					ws.close();
				}

				if (message.includes('bid')) {
					level2Data.addMessage({
						message,
					});
				}
			}
		};

		ws.onclose = (event) => {
			if (event.wasClean) {
				Logger.debug(
					`[KuCoin WebSocket] Connection closed cleanly: code=${event.code}`,
				);

				const messages = level2Data.getMessagesAsJson();

				fs.writeFileSync(filePathRaw, messages, {
					flag: 'a+',
				});

				const orderBookUpdates = level2Data.getOrderBookUpdatesAsJson();

				fs.writeFileSync(filePathSequences, orderBookUpdates, {
					flag: 'a+',
				});
			} else {
				// Server process killed or network down
				// event.code is usually 1006 in this case
				// TODO: If connection dies probs need some type of alert
				Logger.error('[KuCoin WebSocket] Connection died', event.code);
			}
		};

		ws.onerror = (error) => {
			console.log(`[error]`, error);
			ws.close();
		};
	};
}

export default KuCoin;
