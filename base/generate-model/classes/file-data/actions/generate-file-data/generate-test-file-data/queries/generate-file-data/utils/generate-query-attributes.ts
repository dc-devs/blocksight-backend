import generateRelatedToQuery from './generate-related-to-query';
import { IModel } from '../../../../../../../../interfaces/model';
import { Character, Crud } from '../../../../../../../../enums';

interface IProps {
	model: IModel;
	crudOperation?: Crud;
}

const generateQueryAttributes = ({ model, crudOperation }: IProps) => {
	let data = '';
	const { attributeBundles, relatedTo } = model;
	const { all } = attributeBundles;
	const { attributes } = all;

	data += Character.TAB + Character.TAB + 'id' + Character.LINE_BREAK;

	Object.keys(attributes).forEach((attribute) => {
		data +=
			Character.TAB + Character.TAB + attribute + Character.LINE_BREAK;
	});

	if (
		relatedTo &&
		(crudOperation === Crud.FIND_ONE || crudOperation === Crud.FIND_ALL)
	) {
		data += generateRelatedToQuery({ model });
	}

	return data;
};

export default generateQueryAttributes;
