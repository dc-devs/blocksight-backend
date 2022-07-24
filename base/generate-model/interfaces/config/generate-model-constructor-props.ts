import IModelAttributesInput from './model-attributes-input';

interface IGenerateModelConstructorProps {
	isManyToMany?: boolean;
	attributes: IModelAttributesInput;
	modelNamePluralPascalCase: string;
}

export default IGenerateModelConstructorProps;
