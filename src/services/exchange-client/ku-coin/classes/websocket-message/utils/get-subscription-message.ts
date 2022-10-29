import { Topic, Symbol, Channel } from '../../../enums';

enum Type {
	Subscribe = 'subscribe',
}

interface IOptions {
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
	connectId: string;
}

const getSubscriptionMessage = ({
	connectId,
	topic,
	symbol,
	channel,
}: IOptions) => {
	const subscriptionMessage = JSON.stringify({
		id: connectId,
		response: true,
		type: Type.Subscribe,
		topic: `/${channel}/${topic}:${symbol}`,
	});

	return subscriptionMessage;
};

export default getSubscriptionMessage;
