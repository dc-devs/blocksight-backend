import { pascalCase } from 'change-case';
import { Character } from '../../../../../../../../enums';
import { IModel } from '../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
	crudOperation: string;
	queryType: string;
}

const generateTopQueryFragmentUpdate = ({
	model,
	queryType,
	crudOperation,
}: IProps) => {
	let data = '';

	data += `const ${crudOperation}Query = \`` + Character.LINE_BREAK;
	data += `mutation ${pascalCase(queryType)}($id: Int!, $update${
		model.name.singular.pascalCase
	}Input: Update${model.name.singular.pascalCase}Input!) {
  update${model.name.singular.pascalCase}(id: $id, update${
		model.name.singular.pascalCase
	}Input: $update${model.name.singular.pascalCase}Input) {`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateTopQueryFragmentUpdate;
