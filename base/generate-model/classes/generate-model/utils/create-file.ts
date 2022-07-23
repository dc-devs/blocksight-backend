import fs from 'fs';

interface IProps {
	file: string;
	data?: string;
}

const createFile = ({ file, data = '' }: IProps) => {
	const { writeFileSync } = fs;

	writeFileSync(file, data);
};

export default createFile;
