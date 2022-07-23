import fs from 'fs';

interface IProps {
	directory: string;
}

const createFolder = ({ directory }: IProps) => {
	const { existsSync, mkdirSync } = fs;

	if (!existsSync(directory)) {
		mkdirSync(directory, { recursive: true });
	}
};

export default createFolder;
