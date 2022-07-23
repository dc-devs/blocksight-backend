import { createFile } from '../utils';
import { IFilePaths, IModelName } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
	modelName: IModelName;
}

const createModuleFile = ({ modelName, filePaths }: IProps) => {
	const data = ``;

	createFile({
		data,
		file: filePaths.root.module.path,
	});
};

export default createModuleFile;
