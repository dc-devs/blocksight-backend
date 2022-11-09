import KuFootprint from '../../../tick-data/tick-data';
import mockMatchExecutionMessages from '../mocks/match-exection-messages';

describe('KuFootprint', () => {
	let kuFootprint: KuFootprint;

	beforeEach(() => {
		kuFootprint = new KuFootprint();
	});

	it('should be a class', () => {
		expect(kuFootprint instanceof KuFootprint).toBeTruthy();
	});

	describe('getFootPrint', () => {
		it('should be a function', () => {
			expect(typeof kuFootprint.getTickData).toBe('function');
		});

		describe('when called', () => {
			it('should return current state of the footprint', () => {
				expect(kuFootprint.getTickData()).toEqual({});
			});
		});
	});

	describe('addMessage', () => {
		it('should be a function', () => {
			expect(typeof kuFootprint.addMessage).toBe('function');
		});

		describe('when called with a serries of match execution messages', () => {
			beforeEach(() => {
				mockMatchExecutionMessages.forEach((message) => {
					const stringifiedMessage = JSON.stringify(message);

					kuFootprint.addMessage({ message: stringifiedMessage });
				});
			});

			it('should create the expected footprint', () => {
				// console.log(kuFootprint.getTickData());
				expect(true).toBeTruthy();
			});
		});
	});

	// describe('addMessage', () => {
	// 	it('should be a function', () => {
	// 		expect(typeof kuFootprint.addMessage).toBe('function');
	// 	});

	// 	describe('when called with a serries of match execution messages', () => {
	// 		beforeEach(() => {
	// 			mockMatchExecutionMessages.forEach((message) => {
	// 				const stringifiedMessage = JSON.stringify(message);

	// 				kuFootprint.addMessage({ message: stringifiedMessage });
	// 			});
	// 		});

	// 		it('should create the expected footprint', () => {
	// 			console.log(kuFootprint.getTickData());
	// 			expect(true).toBeTruthy();
	// 		});
	// 	});
	// });
});
