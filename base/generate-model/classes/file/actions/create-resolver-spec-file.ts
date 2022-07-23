import { createFile } from '../utils';
import { IFilePaths, IModelName } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
	modelName: IModelName;
}

const createResolverSpecFile = ({ filePaths, modelName }: IProps) => {
	const data = ``;
	createFile({
		data,
		file: filePaths.root.resolverSpec.path,
	});
};

export default createResolverSpecFile;
