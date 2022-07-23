import { join } from 'path';
import { FolderName } from '../enums';

const generateRootFolderPath = (modelNameSnakeCase: string) => {
	const modelRootFolderPath = join(
		__dirname,
		'..',
		'..',
		'..',
		'..',
		'..',
		'..',
		FolderName.SRC,
		FolderName.MODELS,
		modelNameSnakeCase,
	);

	return modelRootFolderPath;
};

export default generateRootFolderPath;
