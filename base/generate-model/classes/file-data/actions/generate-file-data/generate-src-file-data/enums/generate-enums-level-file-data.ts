import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataEnums } from '../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateEnumsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataEnums => {
	return {
		index: {
			data: 'index',
		},
		validationError: {
			data: 'validationError',
		},
	};
};

export default generateEnumsLevelFileData;
