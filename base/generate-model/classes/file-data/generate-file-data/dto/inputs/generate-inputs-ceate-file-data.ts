import { IModelName, IModelAttributes } from '../../../../../interfaces';

interface IProps {
	modelName: IModelName;
	attributes: IModelAttributes;
}

const generateInputsCreateFileData = ({ modelName, attributes }: IProps) => {
	const data = `${modelName.plural.pascalCase}`;

	return data;
};

export default generateInputsCreateFileData;
