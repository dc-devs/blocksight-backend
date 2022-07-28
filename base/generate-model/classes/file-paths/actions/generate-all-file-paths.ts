import { join } from 'path';
import { FileName } from '../enums';
import { IModelName } from '../../../interfaces/model-name';
import { IFilePaths } from '../../../interfaces/file-paths';
import { generateSrcFilePaths } from './generate-file-paths/generate-src-file-paths';

interface IProps {
	rootPath: string;
	modelName: IModelName;
}

const generateAllFilePaths = ({ rootPath, modelName }: IProps) => {
	const filePaths = generateSrcFilePaths({ rootPath, modelName });

	const paths: IFilePaths = filePaths;

	return paths;
};

export default generateAllFilePaths;
