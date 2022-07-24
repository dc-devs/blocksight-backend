import IModelAttribute from './model-attribute';

interface IAttributes {
	[key: string]: IModelAttribute;
}

interface IModelAttributeProps {
	attributes: IAttributes;
	classValidators: string[];
}

interface IModelAttributes {
	withTimeStamps: IModelAttributeProps;
	withoutTimeStamps: IModelAttributeProps;
}

export default IModelAttributes;
