import * as colors from 'colors';

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

		log.apply(console, [
			colors.cyan('[Nest-Debug]'),
			colors.cyan(title),
			...coloredMessages,
		]);
	};
}

export default Logger;
