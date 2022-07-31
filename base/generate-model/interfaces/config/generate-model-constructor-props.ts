import IModelAttributesInput from './model-attributes-input';
import { RelationType } from '../../enums';

interface IGenerateModelConstructorProps {
	relationType?: RelationType;
	relatedTo?: string[];
	attributes: IModelAttributesInput;
	modelNamePluralPascalCase: string;
}

export default IGenerateModelConstructorProps;
