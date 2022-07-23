import fs from 'fs';

const readFile = (file) => {
	const { readFileSync } = fs;

	return readFileSync(file).toString();
};

export default readFile;
