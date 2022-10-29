import { Topic, Symbol, Channel } from '../../../enums';

interface IOptions {
	name: string;
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
	timestamp: number;
	extension?: string;
}

const getFileName = ({
	topic,
	symbol,
	channel,
	name,
	timestamp,
	extension = 'json',
}: IOptions) => {
	return `${channel}-${topic}-${name}-${symbol}-${timestamp}.${extension}`;
};

export default getFileName;
