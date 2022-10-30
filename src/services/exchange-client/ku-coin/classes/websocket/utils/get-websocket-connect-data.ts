import axios from 'axios';
import {
	IWebsocketConnectData,
	IWebsocketAuthResponseData,
} from '../../../interfaces';

enum Endpoint {
	WebsocketAuthentication = 'https://api.kucoin.com/api/v1/bullet-public',
}

interface IResponse {
	data: IWebsocketAuthResponseData;
}

interface IOptions {
	connectId: string;
}

const getWebsocketConnectData = async ({
	connectId,
}: IOptions): Promise<IWebsocketConnectData> => {
	const response: IResponse = await axios.post(
		Endpoint.WebsocketAuthentication,
	);
	const { data } = response;
	const { data: kuCoinData } = data;
	const { token, instanceServers } = kuCoinData;
	const instanceServer = instanceServers[0];
	const { endpoint, pingInterval } = instanceServer;

	return {
		token,
		connectId,
		pingInterval,
		instanceServer,
		connectionUrl: `${endpoint}?token=${token}&[connectId=${connectId}]`,
	};
};

export default getWebsocketConnectData;
