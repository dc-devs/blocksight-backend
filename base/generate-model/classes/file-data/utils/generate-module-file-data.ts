import { IModelName } from '../../../interfaces';

interface IProps {
	modelName: IModelName;
}

const generateModuleFileData = ({ modelName }: IProps) => {
	const data = `${modelName}`;

	return data;
};

export default generateModuleFileData;
