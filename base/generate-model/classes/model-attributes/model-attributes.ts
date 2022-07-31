import { RelationType } from '../../enums';
import { generateModelAttributes } from './actions';
import { IModelAttributesInput } from '../../interfaces/config';
import { IModelAttributes } from '../../interfaces/model-attribute';

interface IConstructorProps {
	relatedTo: string[];
	relationType: RelationType;
	attributes: IModelAttributesInput;
}

class ModelAttributes {
	modelAttributes: IModelAttributes;

	constructor({ attributes, relationType, relatedTo }: IConstructorProps) {
		const modelAttributes = generateModelAttributes({
			relatedTo,
			attributes,
			relationType,
		});

		this.modelAttributes = modelAttributes;
	}
}

export default ModelAttributes;
