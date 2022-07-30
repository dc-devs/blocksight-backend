import { IModelName } from '../../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateInputsFindAllFileData = ({ modelName }: IProps) => {
	const data = `import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import {
	${modelName.singular.pascalCase}WhereInput,
	${modelName.singular.pascalCase}OrderByInput,
	${modelName.singular.pascalCase}CursorInput,
} from '../prisma';

@InputType()
export class FindAll${modelName.plural.pascalCase}Input {
	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	skip?: number;

	@IsNumber()
	@IsOptional()
	@Field({ nullable: true })
	take?: number;

	@IsOptional()
	@Field({ nullable: true })
	cursor?: ${modelName.singular.pascalCase}CursorInput;

	@IsOptional()
	@Field({ nullable: true })
	where?: ${modelName.singular.pascalCase}WhereInput;

	@IsOptional()
	@Field({ nullable: true })
	orderBy?: ${modelName.singular.pascalCase}OrderByInput;
}
`;
	return data;
};

export default generateInputsFindAllFileData;
