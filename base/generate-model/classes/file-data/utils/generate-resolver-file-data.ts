import { IModelName } from '../../../interfaces';

interface IProps {
	modelName: IModelName;
}

const generateResolverFileData = ({ modelName }: IProps) => {
	const data = `${modelName}`;

	return data;
};

export default generateResolverFileData;
