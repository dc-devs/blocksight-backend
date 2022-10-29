import { join } from 'path';

interface IOptions {
	fileName: string;
}

const getFilePath = ({ fileName }: IOptions) => {
	const basePath = join(
		__dirname,
		'..',
		'..',
		'..',
		'..',
		'..',
		'..',
		'src',
		'services',
		'exchange-client',
		'ku-coin',
	);

	return join(basePath, fileName);
};

export default getFilePath;
