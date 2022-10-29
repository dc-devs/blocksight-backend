import fs from 'fs';
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Topic, Symbol, Channel } from './enums';
import {
	getFilePath,
	getFileName,
	getPingMessage,
	getWebsocketEndpoint,
	addMessageToSequences,
	getSubscriptionMessage,
} from './utils';

class KuCoin {
	constructor() {}

	init = async () => {
		const raw = [];
		const sequences = {};

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

		const websocketEndpoint = await getWebsocketEndpoint({ connectId });

		// var ws: any;
		var ws = new WebSocket(websocketEndpoint);

		ws.onopen = () => {
			console.log('[open] Connection established');

			ws.send(pingMessage);
			ws.send(subscribeToLevel2Data);

			setTimeout(() => {
				ws.close();
			}, 5000);

			// setInterval(async () => {
			// 	ws.send(pingMessage);
			// }, pingInterval);
		};

		ws.onmessage = (event) => {
			const message = event.data;

			if (typeof message === 'string') {
				if (message.includes('error')) {
					ws.close();
				}

				if (message.includes('bid')) {
					addMessageToSequences({ sequences, message });
					raw.push(message);
				}
			}
		};

		ws.onclose = (event) => {
			if (event.wasClean) {
				console.log(
					`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
				);

				fs.writeFileSync(filePathRaw, JSON.stringify(raw), {
					flag: 'a+',
				});

				fs.writeFileSync(filePathSequences, JSON.stringify(sequences), {
					flag: 'a+',
				});
			} else {
				// e.g. server process killed or network down
				// event.code is usually 1006 in this case
				console.log('[close] Connection died', event.code);
			}
		};

		ws.onerror = (error) => {
			console.log(`[error]`, error);
			ws.close();
		};
	};
}

export default KuCoin;
