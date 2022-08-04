import IRelatedTo from './related-to';
import { RelationType } from '../../enums';
import IModelInput from './model-attributes-input';

interface IGenerateModelConstructorProps {
	relatedTo?: IRelatedTo;
	relationType?: RelationType;
	attributes: IModelInput;
	modelNamePluralPascalCase: string;
}

export default IGenerateModelConstructorProps;
