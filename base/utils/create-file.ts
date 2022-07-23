import fs from 'fs';

const createFile = (file) => {
	const { writeFileSync } = fs;

	writeFileSync(file, '');
};

export default createFile;
