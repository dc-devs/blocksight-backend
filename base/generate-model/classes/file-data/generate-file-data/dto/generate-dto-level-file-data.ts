import { generateInputsLevelFileData } from './inputs';
import {
	IModelName,
	IFileDataDto,
} from '../../../../interfaces';

interface IProps {
	modelName: IModelName;
	modelAttributes: any;
}

const generateDtoLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataDto => {
	const inputs = generateInputsLevelFileData({
		modelName,
		modelAttributes,
	});

	return {
		inputs,
	};
};

export default generateDtoLevelFileData;
