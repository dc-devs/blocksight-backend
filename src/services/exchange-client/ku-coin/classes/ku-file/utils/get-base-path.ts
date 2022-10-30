import { join } from 'path';

const getBasePath = () => {
	return join(
		__dirname,
		'..',
		'..',
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
};

export default getBasePath;
