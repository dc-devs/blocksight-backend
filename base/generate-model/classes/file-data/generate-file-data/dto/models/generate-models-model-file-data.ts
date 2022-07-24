import { Character, InputType } from '../../../enums';
import { IModelName } from '../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../interfaces/model-attribute';
import {
	generateInputFields,
	generateImportNestJsGraphQl,
	generateBottomClassFragment,
	generateImportClassValidator,
	generateTopInputClassFragment,
} from '../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}
interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateModelsModelFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	return 'var test = true';
};

export default generateModelsModelFileData;
