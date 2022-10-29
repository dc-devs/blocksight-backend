import fs from 'fs';

interface IOptions {
	filePath: string;
}

const parseMarketOrderBook = ({ filePath }: IOptions) => {
	const file = fs.readFileSync(filePath);

	console.log(file);
};

export default parseMarketOrderBook;
