import { IModelAttributesInput } from '../../../interfaces';
import { deduplicateArray, flattenArrayOfArrays } from '../../../utils';

interface IProps {
	filterTimeStamps?: boolean;
	attributes: IModelAttributesInput;
}

const getClassValidators = ({
	attributes,
	filterTimeStamps = false,
}: IProps) => {
	const filteredAttributes = Object.keys(attributes).filter((attribute) => {
		let filterCriteria;

		if (filterTimeStamps) {
			filterCriteria =
				attribute !== 'createdAt' && attribute !== 'updatedAt';
		} else {
			filterCriteria = true;
		}

		return filterCriteria;
	});

	const classValidatorsNested = filteredAttributes.map((attribute) => {
		const attributeProps = attributes[attribute];
		return attributeProps.classValidators;
	});

	const classValidatorsWithDups = flattenArrayOfArrays(classValidatorsNested);
	const classValidators = deduplicateArray(classValidatorsWithDups);

	return classValidators;
};

export default getClassValidators;
