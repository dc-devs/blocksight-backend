import { IModelName } from '../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateResolverFileData = ({ modelName }: IProps) => {
	const data = `import { ${modelName.plural.pascalCase}Service } from './${modelName.plural.paramCase}.service';
import { ${modelName.singular.pascalCase} } from './dto/models/${modelName.singular.paramCase}.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../../graphql/errors/generate-graphql-error';
import {
	Update${modelName.singular.pascalCase}Input,
	Create${modelName.singular.pascalCase}Input,
	FindOne${modelName.singular.pascalCase}Input,
	FindAll${modelName.plural.pascalCase}Input,
} from './dto/inputs';

@Resolver(() => ${modelName.singular.pascalCase})
export class ${modelName.plural.pascalCase}Resolver {
	constructor(private readonly ${modelName.singular.camelCase}Service: ${modelName.plural.pascalCase}Service) {}

	@Query(() => [${modelName.singular.pascalCase}])
	findAll${modelName.plural.pascalCase}(
		@Args('findAll${modelName.plural.pascalCase}Input')
		findAll${modelName.plural.pascalCase}Input: FindAll${modelName.plural.pascalCase}Input,
	): Promise<${modelName.singular.pascalCase}[]> {
		return this.${modelName.singular.camelCase}Service.findAll(findAll${modelName.plural.pascalCase}Input);
	}

	@Query(() => ${modelName.singular.pascalCase}, { nullable: true })
	findOne${modelName.singular.pascalCase}(
		@Args('findOne${modelName.singular.pascalCase}Input')
		findOne${modelName.singular.pascalCase}Input: FindOne${modelName.singular.pascalCase}Input,
	): Promise<${modelName.singular.pascalCase} | null> {
		return this.${modelName.singular.camelCase}Service.findOne(findOne${modelName.singular.pascalCase}Input);
	}

	@Mutation(() => ${modelName.singular.pascalCase})
	async create${modelName.singular.pascalCase}(
		@Args('create${modelName.singular.pascalCase}Input')
		create${modelName.singular.pascalCase}Input: Create${modelName.singular.pascalCase}Input,
	) {
		try {
			return await this.${modelName.singular.camelCase}Service.create({
				...create${modelName.singular.pascalCase}Input,
			});
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => ${modelName.singular.pascalCase})
	async update${modelName.singular.pascalCase}(
		@Args('id', { type: () => Int }) id: number,
		@Args('update${modelName.singular.pascalCase}Input') update${modelName.singular.pascalCase}Input: Update${modelName.singular.pascalCase}Input,
	): Promise<${modelName.singular.pascalCase}> {
		try {
			return await this.${modelName.singular.camelCase}Service.update(id, update${modelName.singular.pascalCase}Input);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => ${modelName.singular.pascalCase})
	delete${modelName.singular.pascalCase}(
		@Args('id', { type: () => Int }) id: number,
	): Promise<${modelName.singular.pascalCase}> {
		return this.${modelName.singular.camelCase}Service.delete(id);
	}
}
`;

	return data;
};

export default generateResolverFileData;
