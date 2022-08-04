import { RelationType } from '../../../enums';
import { IRelatedTo } from '../../../interfaces/config';
import filterAttributes from '../utils/filter-attributes';
import getClassValidators from '../utils/get-class-validators';
import { IModelInput } from '../../../interfaces/config';
import { IModel } from '../../../interfaces/model';
import { IModelName } from '../../../interfaces/model-name';
import { IRelationalModelNames } from '../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	relatedTo?: IRelatedTo;
	attributes: IModelInput;
	relationType: RelationType;
	relationalModelNames: IRelationalModelNames;
}

const generateModel = ({
	modelName,
	relatedTo,
	attributes,
	relationType,
	relationalModelNames,
}: IProps): IModel => {
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

	const hasUniqueProps = Object.keys(attributesUnique).length > 0;

	return {
		relatedTo,
		relationType,
		hasUniqueProps,
		name: modelName,
		relationalModelNames,
		attributeBundles: {
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
		},
	};
};

export default generateModel;
