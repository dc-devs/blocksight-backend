import axios from 'axios';

enum Endpoint {
	WebsocketAuthentication = 'https://api.kucoin.com/api/v1/bullet-public',
}

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

interface IOptions {
	connectId: string;
}

const getWebsocketEndpoint = async ({ connectId }: IOptions) => {
	const response: IResponse = await axios.post(
		Endpoint.WebsocketAuthentication,
	);
	const { data } = response;
	const { data: KuCoinData } = data;
	const { token, instanceServers } = KuCoinData;
	const firstInstanceServer = instanceServers[0];
	const { endpoint } = firstInstanceServer;

	return `${endpoint}?token=${token}&[connectId=${connectId}]`;
};

export default getWebsocketEndpoint;
