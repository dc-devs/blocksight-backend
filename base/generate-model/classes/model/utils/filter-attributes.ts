import { Attribute } from 'base/generate-model/enums';
import { IModelInput } from '../../../interfaces/config';

interface IProps {
	filterUnique?: boolean;
	filterTimeStampAttrs?: boolean;
	attributes: IModelInput;
}

const filterAttributes = ({
	attributes,
	filterUnique = false,
	filterTimeStampAttrs = false,
}: IProps) => {
	const filteredAttributes = {};

	const filteredAttributeKeys = Object.keys(attributes).filter(
		(attributeKey) => {
			let filterCriteria;
			const attribute = attributes[attributeKey];

			if (filterUnique) {
				filterCriteria = attribute.isUnique;
			} else if (filterTimeStampAttrs) {
				filterCriteria =
					attributeKey !== Attribute.CREATED_AT &&
					attributeKey !== Attribute.UPDATED_AT;
			} else {
				filterCriteria = true;
			}

			return filterCriteria;
		},
	);

	filteredAttributeKeys.forEach((filteredAttributeKey) => {
		filteredAttributes[filteredAttributeKey] =
			attributes[filteredAttributeKey];
	});

	return filteredAttributes;
};

export default filterAttributes;
