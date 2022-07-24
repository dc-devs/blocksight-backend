interface IModelAttribute {
	isUnique?: boolean;
	graphqlType: string;
	typeScriptType: string;
	classValidators: string[];
}

export default IModelAttribute;
