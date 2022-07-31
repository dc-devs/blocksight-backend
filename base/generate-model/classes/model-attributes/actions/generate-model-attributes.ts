import { RelationType } from '../../../enums';
import filterAttributes from '../utils/filter-attributes';
import getClassValidators from '../utils/get-class-validators';
import { IModelAttributesInput } from '../../../interfaces/config';
import { IModelAttributes } from '../../../interfaces/model-attribute';

interface IProps {
	relatedTo?: string[];
	relationType: RelationType;
	attributes: IModelAttributesInput;
}

const generateModelAttributes = ({
	relatedTo,
	attributes,
	relationType,
}: IProps): IModelAttributes => {
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
		relatedTo,
		relationType,
		all: {
			attributes,
			classValidators,
		},
		unique: {
			attributes: attributesUnique,
			classValidators: classValidatorsForUniqueAttrs,
		},
		withoutTimeStamps: {
			attributes: attributesWithoutTimeStamps,
			classValidators: classValidatorsForAttrsWithoutTimeStamps,
		},
	};
};

export default generateModelAttributes;
