import IInstanceServer from './i-instance-server';

interface IResponseData {
	token: string;
	instanceServers: IInstanceServer[];
}

interface IWebsocketAuthResponseData {
	code: string;
	data: IResponseData;
}

export default IWebsocketAuthResponseData;
