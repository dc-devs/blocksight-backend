import { GraphqlModule } from '../enums';
import { Character } from '../../../enums';
import {
	generateTopClassFragment,
	generateImportNestJsGraphQl,
	generateImportClassValidator,
} from '.';

interface IProps {
	className: string;
	graphqlType: GraphqlModule;
	classValidators: string[];
	hasJSONAttribute?: boolean;
	shouldSkipImportPrisma?: boolean;
	classValidatorsIsOptional?: boolean;
	classValidatorsAutoImports?: boolean;
}

const generateImportsAndTopClassFragment = ({
	className,
	graphqlType,
	classValidators,
	hasJSONAttribute = false,
	shouldSkipImportPrisma = false,
	classValidatorsIsOptional = false,
	classValidatorsAutoImports = true,
}: IProps) => {
	let data = '';
	const importPrisma = `import { Prisma } from '@prisma/client';`;
	const importGraphQLJSON = `import { GraphQLJSON } from 'graphql-type-json';`;
	const importClassValidator = generateImportClassValidator({
		classValidators: classValidators,
		autoImports: classValidatorsAutoImports,
		addIsOptional: classValidatorsIsOptional,
	});
	const importNestJsGraphQl = generateImportNestJsGraphQl({
		modules: [graphqlType],
	});
	const topInputClassFragment = generateTopClassFragment({
		className,
		decorator: graphqlType,
	});

	if (hasJSONAttribute && !shouldSkipImportPrisma) {
		data += importPrisma + Character.LINE_BREAK;
	}

	if (hasJSONAttribute) {
		data += importGraphQLJSON + Character.LINE_BREAK;
	}

	data += importNestJsGraphQl;
	data += importClassValidator;
	data += Character.LINE_BREAK;
	data += topInputClassFragment;

	return data;
};

export default generateImportsAndTopClassFragment;
