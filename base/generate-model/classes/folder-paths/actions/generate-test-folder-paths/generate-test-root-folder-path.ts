import { join } from 'path';
import { FolderName } from '../../enums';

interface IProps {
	modelName: string;
}

const generateTestRootFolderPath = ({ modelName }: IProps) => {
	const testRootFolderPath = join(
		__dirname,
		'..',
		'..',
		'..',
		'..',
		'..',
		'..',
		'..',
		FolderName.TEST,
		FolderName.MODELS,
		modelName,
	);

	return testRootFolderPath;
};

export default generateTestRootFolderPath;
