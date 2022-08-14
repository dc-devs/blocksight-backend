import { SpecialType, RelationType } from '../../../enums';
import { IRelatedTo } from '../../../interfaces/config';
import filterAttributes from '../utils/filter-attributes';
import getClassValidators from '../utils/get-class-validators';
import { IModelInput } from '../../../interfaces/config';
import { IModel, ITests } from '../../../interfaces/model';
import { IModelName } from '../../../interfaces/model-name';
import { IRelationalModelNames } from '../../../interfaces/model';

interface IProps {
	tests: ITests;
	modelName: IModelName;
	relatedTo?: IRelatedTo;
	attributes: IModelInput;
	relationType: RelationType;
	relationalModelNames: IRelationalModelNames;
}

const generateModel = ({
	tests,
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

	const hasJSONAttribute = Object.keys(attributes).some((attributeName) => {
		const attribute = attributes[attributeName];

		return attribute?.specialType === SpecialType.JSON;
	});

	const hasUniqueProps = Object.keys(attributesUnique).length > 0;
	const isManyToMany = RelationType.MANY_TO_MANY === relationType;
	const isHasOne = RelationType.HAS_ONE === relationType;
	const isHasMany = RelationType.HAS_MANY === relationType;

	return {
		tests,
		relatedTo,
		isHasOne,
		isHasMany,
		isManyToMany,
		relationType,
		hasUniqueProps,
		name: modelName,
		hasJSONAttribute,
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
