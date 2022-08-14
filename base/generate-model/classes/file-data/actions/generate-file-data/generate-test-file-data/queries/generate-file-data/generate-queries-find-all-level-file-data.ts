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

const generateFindAllFileData = ({ modelName, model }: IProps) => {
	let data = '';
	const topQueryFragment = generateTopQueryFragment({
		crudOperation: Crud.FIND_ALL,
		queryType: QueryType.QUERY,
		modelName: modelName.plural.pascalCase,
	});
	const queryAttributes = generateQueryAttributes({
		crudOperation: Crud.FIND_ALL,
		model,
	});
	const bottomQueryFragment = generateBottomQueryFragment({
		crudOperation: Crud.FIND_ALL,
	});

	data += topQueryFragment;
	data += queryAttributes;
	data += bottomQueryFragment;

	return data;
};

export default generateFindAllFileData;
