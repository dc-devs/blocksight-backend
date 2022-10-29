import fs from 'fs';

interface IOptions {
	filePath: string;
}

const parseMarketLevel2Data = ({ filePath }: IOptions) => {
	const file = fs.readFileSync(filePath);

	console.log(file);
};

export default parseMarketLevel2Data;
