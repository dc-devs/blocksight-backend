import { RelationType } from '../../enums';
import { generateModel } from './actions';
import { IModelInput, IRelatedTo } from '../../interfaces/config';
import { IModel, ITests } from '../../interfaces/model';
import { IModelName } from '../../interfaces/model-name';
import { IRelationalModelNames } from '../../interfaces/model';

interface IConstructorProps {
	tests: ITests;
	modelName: IModelName;
	relatedTo: IRelatedTo;
	relationType: RelationType;
	attributes: IModelInput;
	relationalModelNames: IRelationalModelNames;
}

class ModelAttributes {
	model: IModel;

	constructor({
		tests,
		modelName,
		attributes,
		relatedTo,
		relationType,
		relationalModelNames,
	}: IConstructorProps) {
		const model = generateModel({
			tests,
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
