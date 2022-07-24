import IModelAttribute from './model-attribute';

interface IAttributes {
	[key: string]: IModelAttribute;
}

interface IModelAttributes {
	attributes: IAttributes;
	classValidators: string[];
	classValidatorsForAttrs: string[];
}

export default IModelAttributes;
