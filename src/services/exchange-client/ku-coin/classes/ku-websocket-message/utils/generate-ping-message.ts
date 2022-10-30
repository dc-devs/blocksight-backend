interface IOptions {
	connectId: string;
}

const generatePingMessage = ({ connectId }: IOptions) => {
	return JSON.stringify({
		id: connectId,
		type: 'ping',
	});
};

export default generatePingMessage;
