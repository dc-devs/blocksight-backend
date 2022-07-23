import { createFile } from '../utils';
import { IFilePaths, IModelName } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
	modelName: IModelName;
}

// modelClass?
// Need to add CamelCase
// Handle case when name is single or plural

const createResolverFile = ({ filePaths, modelName }: IProps) => {
	const data = ``;
	createFile({
		data,
		file: filePaths.root.resolver.path,
	});
};

export default createResolverFile;
