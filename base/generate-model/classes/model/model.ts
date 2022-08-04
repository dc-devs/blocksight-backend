import { RelationType } from '../../enums';
import { generateModel } from './actions';
import { IModelInput } from '../../interfaces/config';
import { IRelatedTo } from '../../interfaces/config';
import { IModel } from '../../interfaces/model';
import { IModelName } from '../../interfaces/model-name';
import { IRelationalModelNames } from '../../interfaces/model';

interface IConstructorProps {
	modelName: IModelName;
	relatedTo: IRelatedTo;
	relationType: RelationType;
	attributes: IModelInput;
	relationalModelNames: IRelationalModelNames;
}

class ModelAttributes {
	model: IModel;

	constructor({
		modelName,
		attributes,
		relatedTo,
		relationType,
		relationalModelNames,
	}: IConstructorProps) {
		const model = generateModel({
			modelName,
			relatedTo,
			attributes,
			relationType,
			relationalModelNames,
		});

		this.model = model;
	}
}

export default ModelAttributes;
