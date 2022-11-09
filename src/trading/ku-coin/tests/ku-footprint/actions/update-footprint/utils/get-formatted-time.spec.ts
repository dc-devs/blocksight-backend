import getFormattedTime from '../../../../../../tick-data/actions/update-tick-data/utils/get-formatted-time';

describe('getFormattedTime', () => {
	it('should be a function', () => {
		expect(typeof getFormattedTime).toBe('function');
	});

	describe('when passed a timestamp', () => {
		describe('and the timestamp is a string', () => {
			it('should return formatted time string', () => {
				const expectedFormattedTime = '10/31/2022-9:18';
				const formattedTime = getFormattedTime({
					timestamp: '1667233108782',
				});

				expect(formattedTime).toEqual(expectedFormattedTime);
			});
		});

		describe('and the timestamp is a number', () => {
			it('should return formatted time string', () => {
				const expectedFormattedTime = '10/31/2022-9:18';
				const formattedTime = getFormattedTime({
					timestamp: 1667233108782,
				});

				expect(formattedTime).toEqual(expectedFormattedTime);
			});
		});
	});
});
