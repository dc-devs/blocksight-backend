// import { join } from 'path';
// import { FileName } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import { IFilePathsTest } from '../../../../../interfaces/file-paths';
// import generateDtoLevelFilePaths from './dto/generate-dto-level-file-paths';
// import generateRootLevelFilePaths from './root/generate-root-level-file-paths';
// import generateEnumsLevelFilePaths from './enums/generate-enums-level-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateTestFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsTest => {
	const paths = {
		root: {
			enums: {
				path: '',
			},
			tests: {
				path: '',
			},
			queries: {
				path: '',
			},
			expectedObjects: {
				path: '',
			},
		},
	};

	return paths;
};

export default generateTestFilePaths;
