import { generateModelAttributes } from './utils';
import { IModelAttributesInput, IModelAttributes } from '../../interfaces';

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
