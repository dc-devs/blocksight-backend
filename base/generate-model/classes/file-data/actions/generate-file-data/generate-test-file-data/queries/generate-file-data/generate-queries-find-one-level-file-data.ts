import QueryType from './enum/query-type';
import { Crud } from '../../../../../../../enums';
import { IModelName } from '../../../../../../../interfaces/model-name';
import generateQueryAttributes from './utils/generate-query-attributes';
import generateTopQueryFragment from './utils/generate-top-query-fragment';
import generateBottomQueryFragment from './utils/generate-bottom-query-fragment';
import { IModelAttributes } from '../../../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateFindOneFileData = ({ modelName, modelAttributes }: IProps) => {
	let data = '';
	const topQueryFragment = generateTopQueryFragment({
		crudOperation: Crud.FIND_ONE,
		queryType: QueryType.QUERY,
		modelName: modelName.singular.pascalCase,
	});
	const queryAttributes = generateQueryAttributes({
		modelAttributes,
	});
	const bottomQueryFragment = generateBottomQueryFragment({
		crudOperation: Crud.FIND_ONE,
	});

	data += topQueryFragment;
	data += queryAttributes;
	data += bottomQueryFragment;

	return data;
};

export default generateFindOneFileData;