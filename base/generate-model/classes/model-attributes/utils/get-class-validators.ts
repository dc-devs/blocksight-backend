import { IModelAttributesInput } from '../../../interfaces/config';
import { deduplicateArray, flattenArrayOfArrays } from '../../../utils';

interface IProps {
	filterTimeStamps?: boolean;
	attributes: IModelAttributesInput;
}

const getClassValidators = ({ attributes }: IProps) => {
	const classValidatorsNested = Object.keys(attributes).map((attribute) => {
		const attributeProps = attributes[attribute];
		return attributeProps.classValidators;
	});

	const classValidatorsWithDups = flattenArrayOfArrays(classValidatorsNested);
	const classValidators = deduplicateArray(classValidatorsWithDups);

	return classValidators;
};

export default getClassValidators;
