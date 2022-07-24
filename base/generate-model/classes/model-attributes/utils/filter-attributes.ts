import { Attribute } from 'base/generate-model/enums';
import { IModelAttributesInput } from '../../../interfaces';

interface IProps {
	filterUnique?: boolean;
	filterTimeStampAttrs?: boolean;
	attributes: IModelAttributesInput;
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
					attributeKey !== Attribute.CERATED_AT &&
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
