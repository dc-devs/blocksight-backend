import getClassValidators from './get-class-validators';
import { IModelAttributesInput } from '../../../interfaces';

interface IProps {
	attributes: IModelAttributesInput;
}

const generateModelAttributes = ({ attributes }: IProps) => {
	const classValidators = getClassValidators({ attributes });
	const classValidatorsForAttrs = getClassValidators({
		attributes,
		filterTimeStamps: true,
	});

	return { attributes, classValidators, classValidatorsForAttrs };
};

export default generateModelAttributes;
