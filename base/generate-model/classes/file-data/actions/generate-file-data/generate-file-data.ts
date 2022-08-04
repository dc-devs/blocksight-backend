import generateSrcFileData from './generate-src-file-data';
import generateTestFileData from './generate-test-file-data';
import { IFileData } from '../../../../interfaces/file-data';
import { IModelName } from '../../../../interfaces/model-name';

import { IModel } from '../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateFileData = ({ modelName, model }: IProps): IFileData => {
	const src = generateSrcFileData({ modelName, model });
	const test = generateTestFileData({ modelName, model });

	return { src, test };
};

export default generateFileData;
