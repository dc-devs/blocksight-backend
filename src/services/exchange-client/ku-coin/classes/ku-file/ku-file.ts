import fs from 'fs';
import { join } from 'path';
import { getBasePath, getFileName } from './utils';
import { Topic, Symbol, Channel } from '../../enums';

interface ISaveOptions {
	data: string;
	fileName: string;
}

interface IKuFileOptions {
	topic: Topic;
	symbol: Symbol;
	channel: Channel;
}

class KuFile {
	topic: Topic;
	symbol: Symbol;
	basePath: string;
	channel: Channel;

	constructor({ topic, symbol, channel }: IKuFileOptions) {
		this.topic = topic;
		this.symbol = symbol;
		this.channel = channel;
		this.basePath = getBasePath();
	}

	save = ({ data, fileName }: ISaveOptions) => {
		const fullFileName = getFileName({
			topic: this.topic,
			symbol: this.symbol,
			channel: this.channel,
			name: fileName,
			timestamp: Date.now(),
		});

		const fullFilePath = join(this.basePath, fullFileName);

		fs.writeFileSync(fullFilePath, data, {
			flag: 'a+',
		});
	};
}

export default KuFile;
