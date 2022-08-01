import IRelatedTo from './related-to';
import { RelationType } from '../../enums';
import IModelAttributesInput from './model-attributes-input';

interface IGenerateModelConstructorProps {
	relatedTo?: IRelatedTo;
	relationType?: RelationType;
	attributes: IModelAttributesInput;
	modelNamePluralPascalCase: string;
}

export default IGenerateModelConstructorProps;
