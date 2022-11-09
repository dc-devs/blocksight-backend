import TickData from '../tick-data';
import KuMessageParser from '../ku-coin/src/classes/ku-message-parser';
import matchExecutionMessages from '../ku-coin/tests/mocks/match-exection-messages';

describe('TickData', () => {
	let tickData;

	beforeEach(() => {
		tickData = new TickData({ symbol: 'MATIC_USDC', exchange: 'KuCoin' });
	});

	it('should be a class', () => {
		expect(tickData instanceof TickData).toBe(true);
	});

	describe('when recieving KuCoinMessage ', () => {
		beforeEach(() => {
			matchExecutionMessages.forEach((message) => {
				const tickDataInput =
					KuMessageParser.convertExecutionMessageToTickDataInput({
						message,
					});

				console.log(tickDataInput);
			});
		});

		expect(tickData instanceof TickData).toBe(true);
	});
});
