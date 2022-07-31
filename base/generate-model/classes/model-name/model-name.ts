import { RelationType } from '../../enums';
import { generateModelName } from './utils';
import { IModelName, IModelNameOptions } from '../../interfaces/model-name';

interface IConstructorProps {
	relationType: RelationType;
	modelNamePluralPascalCase: string;
}

class ModelName implements IModelName {
	plural: IModelNameOptions;
	singular: IModelNameOptions;

	constructor({
		relationType,
		modelNamePluralPascalCase,
	}: IConstructorProps) {
		const { singular, plural } = generateModelName({
			relationType,
			modelNamePluralPascalCase,
		});

		this.plural = plural;
		this.singular = singular;
	}
}

export default ModelName;
