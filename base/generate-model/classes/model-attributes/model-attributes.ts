import { generateModelAttributes } from './utils';
import { IModelAttributesInput } from '../../interfaces/config';
import { IModelAttributes } from '../../interfaces/model-attribute';

interface IConstructorProps {
	attributes: IModelAttributesInput;
}

class ModelAttributes {
	modelAttributes: IModelAttributes;

	constructor({ attributes }: IConstructorProps) {
		const modelAttributes = generateModelAttributes({ attributes });

		this.modelAttributes = modelAttributes;
	}
}

export default ModelAttributes;
