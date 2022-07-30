import { Character, GraphqlModule } from '../enums';
import {
	generateTopClassFragment,
	generateImportNestJsGraphQl,
	generateImportClassValidator,
} from '.';

interface IProps {
	className: string;
	graphqlType: GraphqlModule;
	classValidators: string[];
	classValidatorsIsOptional?: boolean;
	classValidatorsAutoImports?: boolean;
}

const generateImportsAndTopClassFragment = ({
	className,
	graphqlType,
	classValidators,
	classValidatorsIsOptional = false,
	classValidatorsAutoImports = true,
}: IProps) => {
	let data = '';
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

	data += importNestJsGraphQl;
	data += importClassValidator;
	data += Character.LINE_BREAK;
	data += topInputClassFragment;

	return data;
};

export default generateImportsAndTopClassFragment;
