import { IModelName } from '../../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateTestsFindAllFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = `const runTests = () => {}; export default runTests`;

	return data;
};

export default generateTestsFindAllFileData;
