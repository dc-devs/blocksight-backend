import getClassValidators from './get-class-validators';
import { IModelAttributesInput, IModelAttributes } from '../../../interfaces';

interface IProps {
	attributes: IModelAttributesInput;
}

const generateModelAttributes = ({ attributes }: IProps): IModelAttributes => {
	const classValidators = getClassValidators({ attributes });
	const classValidatorsForAttrs = getClassValidators({
		attributes,
		filterTimeStamps: true,
	});

	return { attributes, classValidators, classValidatorsForAttrs };
};

export default generateModelAttributes;
