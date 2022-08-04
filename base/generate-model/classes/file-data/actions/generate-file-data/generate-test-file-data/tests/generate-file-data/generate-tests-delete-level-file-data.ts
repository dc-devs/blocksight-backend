import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateTestsDeleteFileData = ({ modelName, model }: IProps) => {
	let data = `const runTests = () => {}; export default runTests`;

	return data;
};

export default generateTestsDeleteFileData;
