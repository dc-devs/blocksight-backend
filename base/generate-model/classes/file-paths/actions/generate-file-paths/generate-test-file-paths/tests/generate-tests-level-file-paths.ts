import { join } from 'path';
import { FileName } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFilePathsTestTests } from '../../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateTestsLevelFilePaths = ({
	rootPath,
	modelName,
}: IProps): IFilePathsTestTests => {
	const indexFilePath = join(
		rootPath,
		`${FileName.INDEX}.ts`,
	);
	const createFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.CREATE}.ts`,
	);
	const deleteFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.DELETE}.ts`,
	);
	const findAllFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.FIND_ALL}.ts`,
	);
	const findOneFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.FIND_ONE}.ts`,
	);
	const updateFilePath = join(
		rootPath,
		`${modelName.plural.paramCase}.${FileName.UPDATE}.ts`,
	);

	return {
		create: {
			path: createFilePath,
		},
		delete: {
			path: deleteFilePath,
		},
		findOne: {
			path: findOneFilePath,
		},
		findAll: {
			path: findAllFilePath,
		},
		update: {
			path: updateFilePath,
		},
		index: {
			path: indexFilePath,
		},
	};
};

export default generateTestsLevelFilePaths;
