import QueryType from './enum/query-type';
import { Crud } from '../../../../../../../enums';
import { IModelName } from '../../../../../../../interfaces/model-name';
import generateQueryAttributes from './utils/generate-query-attributes';
import generateTopQueryFragment from './utils/generate-top-query-fragment';
import generateBottomQueryFragment from './utils/generate-bottom-query-fragment';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateUpdateFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const topQueryFragment = generateTopQueryFragment({
		crudOperation: Crud.UPDATE,
		queryType: QueryType.MUTATION,
		modelName: modelName.singular.pascalCase,
	});
	const queryAttributes = generateQueryAttributes({
		model,
	});
	const bottomQueryFragment = generateBottomQueryFragment({
		crudOperation: Crud.UPDATE,
	});

	data += topQueryFragment;
	data += queryAttributes;
	data += bottomQueryFragment;

	return data;
};

export default generateUpdateFileData;
