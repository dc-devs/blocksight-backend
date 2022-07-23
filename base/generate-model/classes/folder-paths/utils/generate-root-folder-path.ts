import { join } from 'path';
import { FolderName } from '../enums';

const generateRootFolderPath = (modelNameParamCase: string) => {
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
		modelNameParamCase,
	);

	return modelRootFolderPath;
};

export default generateRootFolderPath;
