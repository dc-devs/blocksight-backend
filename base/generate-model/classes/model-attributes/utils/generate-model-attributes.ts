import filterAttributes from './filter-attributes';
import getClassValidators from './get-class-validators';
import { IModelAttributesInput } from '../../../interfaces/config';
import { IModelAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	attributes: IModelAttributesInput;
}

const generateModelAttributes = ({ attributes }: IProps): IModelAttributes => {
	const attributesUnique = filterAttributes({
		attributes,
		filterUnique: true,
	});

	const attributesWithoutTimeStamps = filterAttributes({
		attributes,
		filterTimeStampAttrs: true,
	});

	const classValidators = getClassValidators({ attributes });

	const classValidatorsForUniqueAttrs = getClassValidators({
		attributes: attributesWithoutTimeStamps,
	});

	const classValidatorsForAttrsWithoutTimeStamps = getClassValidators({
		attributes: attributesWithoutTimeStamps,
	});

	return {
		unique: {
			attributes: attributesUnique,
			classValidators: classValidatorsForUniqueAttrs,
		},
		withTimeStamps: {
			attributes,
			classValidators,
		},
		withoutTimeStamps: {
			attributes: attributesWithoutTimeStamps,
			classValidators: classValidatorsForAttrsWithoutTimeStamps,
		},
	};
};

export default generateModelAttributes;
