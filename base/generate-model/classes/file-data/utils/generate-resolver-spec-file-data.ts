import { IModelName } from '../../../interfaces';

interface IProps {
	modelName: IModelName;
}

const generateResolverSpecFileData = ({ modelName }: IProps) => {
	const data = `${modelName}`;

	return data;
};

export default generateResolverSpecFileData;
