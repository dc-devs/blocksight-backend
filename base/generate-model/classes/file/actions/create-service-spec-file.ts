import { createFile } from '../utils';
import { IFilePaths, IModelName } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
	modelName: IModelName;
}

const createServiceSpecFile = ({ filePaths, modelName }: IProps) => {
	createFile({
		file: filePaths.root.serviceSpec.path,
	});
};

export default createServiceSpecFile;
