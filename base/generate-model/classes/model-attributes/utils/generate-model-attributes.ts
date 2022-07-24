import filterAttributes from './filter-attributes';
import getClassValidators from './get-class-validators';
import { IModelAttributesInput, IModelAttributes } from '../../../interfaces';

interface IProps {
	attributes: IModelAttributesInput;
}


const generateModelAttributes = ({ attributes }: IProps): IModelAttributes => {
	const classValidators = getClassValidators({ attributes });

	const attribuesWithoutTimeStamps = filterAttributes({
		attributes,
		filterTimeStampAttrs: true,
	});

	const classValidatorsWithoutTimeStamps = getClassValidators({
		attributes: attribuesWithoutTimeStamps,
	});

	return {
		withTimeStamps: {
			attributes,
			classValidators,
		},
		withoutTimeStamps: {
			attributes: attribuesWithoutTimeStamps,
			classValidators: classValidatorsWithoutTimeStamps,
		},
	};
};

export default generateModelAttributes;
