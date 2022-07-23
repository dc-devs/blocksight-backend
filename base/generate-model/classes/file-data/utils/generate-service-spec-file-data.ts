import { IModelName } from '../../../interfaces';

interface IProps {
	modelName: IModelName;
}

const generateServiceSpecData = ({ modelName }: IProps) => {
	const data = `${modelName}`;

	return data;
};

export default generateServiceSpecData;

