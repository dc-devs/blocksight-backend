import { generateModelAttributes } from './utils';
import { IModelAttributesInput } from '../../interfaces';

interface IConstructorProps {
	attributes: IModelAttributesInput;
}

class ModelAttributes {
	modelAttributes;

	constructor({ attributes }: IConstructorProps) {
		const modelAttributes = generateModelAttributes({ attributes });

		this.modelAttributes = modelAttributes;
	}
}

export default ModelAttributes;
