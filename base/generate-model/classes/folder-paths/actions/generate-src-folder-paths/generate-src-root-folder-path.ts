import { join } from 'path';
import { FolderName } from '../../enums';

interface IProps {
	modelName: string;
}

const generateSrcRootFolderPath = ({ modelName }: IProps) => {
	const modelRootFolderPath = join(
		__dirname,
		'..',
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

export default generateSrcRootFolderPath;
