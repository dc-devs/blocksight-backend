import { join } from 'path';

interface IProps {
	rootPath: string;
	modelName: string;
	fileName: string;
}

const generateFilePath = ({ rootPath, modelName, fileName }: IProps) => {
	return join(rootPath, `${modelName}.${fileName}.ts`);
};

export default generateFilePath;
