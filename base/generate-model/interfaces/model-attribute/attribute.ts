interface IAttribute {
	isUnique?: boolean;
	graphqlType: string;
	typeScriptType: string;
	classValidators: string[];
}

export default IAttribute;
