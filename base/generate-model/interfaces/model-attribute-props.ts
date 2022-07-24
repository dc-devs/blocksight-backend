import IModelAttribute from './model-attribute';

interface IAttributes {
	[key: string]: IModelAttribute;
}

interface IModelAttributeProps {
	attributes: IAttributes;
	classValidators: string[];
}

export default IModelAttributeProps;
