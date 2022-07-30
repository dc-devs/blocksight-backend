import generateSrcFileData from './generate-src-file-data';
import { IFileData } from '../../../../interfaces/file-data';
import { IModelName } from '../../../../interfaces/model-name';

import { IModelAttributes } from '../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileData => {
	const src = generateSrcFileData({ modelName, modelAttributes });

	return { src };
};

export default generateFileData;
