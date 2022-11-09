import { convertNanoToMs } from '../../../../utils';
import { ITickDataInput } from '../../../../interfaces';
import { IMatchExecutionMessage } from '../../interfaces';

class KuMessageParser {
	static convertExecutionMessageToTickDataInput = ({
		message,
	}): ITickDataInput => {
		const parsedMessage: IMatchExecutionMessage = JSON.parse(message);
		const { data } = parsedMessage;
		const { side, time, size, price } = data;
		const timestamp = convertNanoToMs({ nanoseconds: time });

		return {
			price,
			size,
			timestamp,
			side,
		};
	};
}

export default KuMessageParser;
