interface IOptions {
	timestamp: string | number;
}

const getFormattedTime = ({ timestamp }: IOptions) => {
	const timestampNumber = Number(timestamp);
	const jsDate = new Date(timestampNumber);

	const date = jsDate.getDate();
	const month = jsDate.getMonth() + 1;
	const year = jsDate.getFullYear();
	const hours = jsDate.getHours();
	const minutes = jsDate.getMinutes();

	return `${month}/${date}/${year}-${hours}:${minutes}`;
};

export default getFormattedTime;
