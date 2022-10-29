import { join } from 'path';
import { FileName } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IFilePathsTestQueries } from '../../../../../../interfaces/file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateQueriesLevelFilePaths = ({
	rootPath,
}: IProps): IFilePathsTestQueries => {
	const createFilePath = join(
		rootPath,
		`${FileName.CREATE}.${FileName.QUERY}.ts`,
	);
	const deleteFilePath = join(
		rootPath,
		`${FileName.DELETE}.${FileName.QUERY}.ts`,
	);
	const findAllFilePath = join(
		rootPath,
		`${FileName.FIND_ALL}.${FileName.QUERY}.ts`,
	);
	const findOneFilePath = join(
		rootPath,
		`${FileName.FIND_ONE}.${FileName.QUERY}.ts`,
	);
	const updateFilePath = join(
		rootPath,
		`${FileName.UPDATE}.${FileName.QUERY}.ts`,
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
	};
};

export default generateQueriesLevelFilePaths;
