import convertNanoToMs from '../../../../../../tick-data/actions/update-tick-data/utils/convert-nano-to-ms';

describe('convertNanoToMs', () => {
	it('should be a function', () => {
		expect(typeof convertNanoToMs).toBe('function');
	});

	describe('when passed a timestamp in nanoseconds', () => {
		describe('and the timestamp is a string', () => {
			it('should return a timestamp in milliseconds', () => {
				const expectedMilliseconds = 1667233108782;
				const milliseconds = convertNanoToMs({
					nanoseconds: '1667233108782000000',
				});

				expect(milliseconds).toEqual(expectedMilliseconds);
			});
		});

		describe('and the timestamp is a numer', () => {
			it('should return a timestamp in milliseconds', () => {
				const expectedMilliseconds = 1667233108782;
				const milliseconds = convertNanoToMs({
					nanoseconds: 1667233108782000000,
				});

				expect(milliseconds).toEqual(expectedMilliseconds);
			});
		});
	});
});
