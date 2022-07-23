import { FileName } from '../enums';
import { IFilePaths } from '../../../interfaces';
import generateFilePath from './generate-file-path';

interface IProps {
	rootPath: string;
	modelName: string;
}

const generateFilePaths = ({ rootPath, modelName }: IProps) => {
	const moduleFilePath = generateFilePath({
		rootPath,
		modelName,
		fileName: FileName.MODULE,
	});
	const resolverFilePath = generateFilePath({
		rootPath,
		modelName,
		fileName: FileName.RESOLVER,
	});
	const resolverSpecFilePath = generateFilePath({
		rootPath,
		modelName,
		fileName: `${FileName.RESOLVER}.${FileName.SPEC}`,
	});
	const serviceFilePath = generateFilePath({
		rootPath,
		modelName,
		fileName: FileName.SERVICE,
	});
	const serviceSpecFilePath = generateFilePath({
		rootPath,
		modelName,
		fileName: `${FileName.SERVICE}.${FileName.SPEC}`,
	});

	const paths: IFilePaths = {
		root: {
			module: {
				path: moduleFilePath,
			},
			resolver: {
				path: resolverFilePath,
			},
			resolverSpec: {
				path: resolverSpecFilePath,
			},
			service: {
				path: serviceFilePath,
			},
			serviceSpec: {
				path: serviceSpecFilePath,
			},
		},
	};

	return paths;
};

export default generateFilePaths;
