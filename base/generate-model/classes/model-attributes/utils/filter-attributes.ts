import { Attribute } from 'base/generate-model/enums';

const filterAttributes = ({ attributes, filterTimeStampAttrs }) => {
	const filteredAttributes = {};
	const filteredAttributeKeys = Object.keys(attributes).filter(
		(attribute) => {
			let filterCriteria;

			if (filterTimeStampAttrs) {
				filterCriteria =
					attribute !== Attribute.CERATED_AT &&
					attribute !== Attribute.UPDATED_AT;
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
