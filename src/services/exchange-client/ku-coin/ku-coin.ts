import fs from 'fs';
import axios from 'axios';
import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Topic, Symbol, Channel } from './enums';
import {
	getFilePath,
	getFileName,
	getPingMessage,
	getSubscriptionMessage,
} from './utils';

interface IInstanceServer {
	endpoint: string;
	encrypt: boolean;
	protocol: string;
	pingInterval: number;
	pingTimeout: number;
}

interface IKuCoinData {
	token: string;
	instanceServers: IInstanceServer[];
}

interface IData {
	code: string;
	data: IKuCoinData;
}

interface IResponse {
	data: IData;
}

class KuCoin {
	constructor() {}

	init = async () => {
		const raw = [];
		const sequences = {};
		const url = 'https://api.kucoin.com/api/v1/bullet-public';

		const response: IResponse = await axios.post(url);
		const { data } = response;
		const { data: KuCoinData } = data;
		const { token, instanceServers } = KuCoinData;
		const firstInstanceServer = instanceServers[0];
		const { endpoint } = firstInstanceServer;
		// const { endpoint, pingInterval } = firstInstanceServer;

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

		// var ws: any;
		var ws = new WebSocket(
			`${endpoint}?token=${token}&[connectId=${connectId}]`,
		);

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
					const parsedMessage = JSON.parse(message);
					const { data } = parsedMessage;
					// const { sequenceEnd, sequenceStart, time, changes } = data;
					const { time, changes } = data;
					const { asks: sellOrders, bids: buyOrders } = changes;

					sellOrders.forEach((sellOrder) => {
						const price = sellOrder[0];
						const size = sellOrder[1];
						const sequence = sellOrder[2];

						if (!sequences[time]) {
							sequences[time] = {};
						}

						if (!sequences[time][sequence]) {
							sequences[time][sequence] = {
								buyOrders: [],
								sellOrders: [],
							};
						}

						sequences[time][sequence].sellOrders.push({
							price,
							size,
						});
					});

					buyOrders.forEach((buyOrder) => {
						const price = buyOrder[0];
						const size = buyOrder[1];
						const sequence = buyOrder[2];

						if (!sequences[time]) {
							sequences[time] = {};
						}

						if (!sequences[time][sequence]) {
							sequences[time][sequence] = {
								buyOrders: [],
								sellOrders: [],
							};
						}

						sequences[time][sequence].buyOrders.push({
							price,
							size,
						});
					});

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
