import { generateModelName } from './utils';
import { IModelName, IModelNameOptions } from '../../interfaces/model-name';

interface IConstructorProps {
	isManyToMany: boolean;
	modelNamePluralPascalCase: string;
}

class ModelName implements IModelName {
	plural: IModelNameOptions;
	singular: IModelNameOptions;

	constructor({
		isManyToMany,
		modelNamePluralPascalCase,
	}: IConstructorProps) {
		const { singular, plural } = generateModelName({
			isManyToMany,
			modelNamePluralPascalCase,
		});

		this.plural = plural;
		this.singular = singular;
	}
}

export default ModelName;
