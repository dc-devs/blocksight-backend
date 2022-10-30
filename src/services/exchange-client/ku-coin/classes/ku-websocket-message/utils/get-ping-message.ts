interface IOptions {
	connectId: string;
}

const getPingMessage = ({ connectId }: IOptions) => {
	return JSON.stringify({
		id: connectId,
		type: 'ping',
	});
};

export default getPingMessage;
