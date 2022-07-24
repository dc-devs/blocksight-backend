import { generateInputsLevelFileData } from './inputs';
import {
	IModelName,
	IFileDataDto,
	IModelAttributes,
} from '../../../../interfaces';

interface IProps {
	modelName: IModelName;
	attributes: IModelAttributes;
}

const generateDtoLevelFileData = ({
	modelName,
	attributes,
}: IProps): IFileDataDto => {
	const inputs = generateInputsLevelFileData({
		modelName,
		attributes,
	});

	return {
		inputs,
	};
};

export default generateDtoLevelFileData;
