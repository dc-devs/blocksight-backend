interface IOptions {
	nanoseconds: string | number;
}

const convertNanoToMs = ({ nanoseconds }: IOptions) => {
	const nanosecondsTime = Number(nanoseconds);
	const milliseconds = Math.round(nanosecondsTime / 1000000);

	return milliseconds;
};

export default convertNanoToMs;
