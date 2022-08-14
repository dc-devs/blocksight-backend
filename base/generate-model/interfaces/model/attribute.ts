interface IAttribute {
	isUnique?: boolean;
	specialType?: string;
	typeScriptType: string;
	classValidators: string[];
}

export default IAttribute;
