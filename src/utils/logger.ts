import colors from 'colors';
import { isDevelopmentEnv } from '../common/constants/environment';

class Logger {
	static debug = (...messages) => {
		const log = console.log;
		const title = messages.shift();

		const coloredMessages = messages.map((baseMessage) => {
			let message;
			const isMessageApplicableForColor = !Array.isArray(baseMessage);

			if (isMessageApplicableForColor) {
				message = baseMessage.toString();
				message = message.green;
			} else {
				message = baseMessage;
			}

			return message;
		});

		if (isDevelopmentEnv || process.env.LOGGER_DEBUG) {
			log.apply(console, [
				colors.cyan('[Nest-Debug]'),
				colors.cyan(title),
				...coloredMessages,
			]);
		}
	};

	static success = (...messages) => {
		const log = console.log;
		const coloredMessages = messages.map((baseMessage) => {
			let message;
			const isMessageApplicableForColor = !Array.isArray(baseMessage);

			if (isMessageApplicableForColor) {
				message = baseMessage.toString();
				message = message.green;
			} else {
				message = baseMessage;
			}

			return message;
		});

		log.apply(console, [
			colors.green('[Nest-Success]'),
			...coloredMessages,
		]);
	};

	static error = (...messages) => {
		const log = console.log;
		const coloredMessages = messages.map((baseMessage) => {
			let message;
			const isMessageApplicableForColor = !Array.isArray(baseMessage);

			if (isMessageApplicableForColor) {
				message = baseMessage.toString();
				message = message.red;
			} else {
				message = baseMessage;
			}

			return message;
		});

		log.apply(console, [colors.red('[Nest-Error]'), ...coloredMessages]);
	};
}

export default Logger;
