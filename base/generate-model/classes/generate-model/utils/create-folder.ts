import fs from 'fs';

const createFolder = (directory) => {
	const { existsSync, mkdirSync } = fs;

	if (!existsSync(directory)) {
		mkdirSync(directory, { recursive: true });
	}
};

export default createFolder;
