import { Character, GraphqlModule } from '../../../../enums';
import { IModelName } from '../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import {
	generateInputFields,
	generateTopClassFragment,
	generateImportNestJsGraphQl,
	generateBottomClassFragment,
	generateImportClassValidator,
} from '../../../../utils';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}
const generateModelsModelFileData = ({
	modelName,
	modelAttributes,
}: IProps) => {
	let data = '';
	const { classValidators, attributes } = modelAttributes.all;
	const importClassValidator = generateImportClassValidator({
		classValidators: classValidators,
	});
	const importNestJsGraphQl = generateImportNestJsGraphQl({
		modules: [GraphqlModule.OBJECT_TYPE],
	});
	const topInputClassFragment = generateTopClassFragment({
		className: `${modelName.singular.pascalCase}`,
		decorator: GraphqlModule.OBJECT_TYPE,
	});
	const inputFields = generateInputFields({ attributes });
	const bottomClassFragment = generateBottomClassFragment();

	data += importNestJsGraphQl;
	data += importClassValidator;
	data += Character.LINE_BREAK;

	data += topInputClassFragment;
	data += inputFields;
	data += bottomClassFragment;

	return data;
};

export default generateModelsModelFileData;
