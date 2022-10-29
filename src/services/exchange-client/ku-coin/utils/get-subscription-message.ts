import { Topic, Symbol, Channel } from '../enums';

interface IOptions {
	connectId: string;
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
}

const getSubscriptionMessage = ({
	connectId,
	topic,
	symbol,
	channel,
}: IOptions) => {
	const subscriptionMessage = JSON.stringify({
		id: connectId,
		type: 'subscribe',
		topic: `/${channel}/${topic}:${symbol}`,
		response: true,
	});

	return subscriptionMessage;
};

export default getSubscriptionMessage;
