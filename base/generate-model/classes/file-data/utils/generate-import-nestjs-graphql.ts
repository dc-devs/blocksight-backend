import { Character } from '../enums';

const generateImportNestJsGraphQl = () => {
	return (
		`import { Field, InputType } from '@nestjs/graphql';` +
		Character.LINE_BREAK
	);
};


export default generateImportNestJsGraphQl;