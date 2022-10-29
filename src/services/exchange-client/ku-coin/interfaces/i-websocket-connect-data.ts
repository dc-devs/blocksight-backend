import IInstanceServer from './i-instance-server';

interface IWebsocketConnectData {
	token: string;
	connectId: string;
	pingInterval: number;
	instanceServer: IInstanceServer;
	connectionUrl: string;
}

export default IWebsocketConnectData;
