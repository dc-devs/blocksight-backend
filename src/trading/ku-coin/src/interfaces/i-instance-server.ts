interface IInstanceServer {
	endpoint: string;
	encrypt: boolean;
	protocol: string;
	pingInterval: number;
	pingTimeout: number;
}

export default IInstanceServer;
