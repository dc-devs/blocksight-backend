import { join } from 'path';
import { FolderName } from '../enums';

const generateRootFolderPath = (modelName: string) => {
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
		modelName,
	);

	return modelRootFolderPath;
};

export default generateRootFolderPath;
