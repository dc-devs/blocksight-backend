import { IModelName } from '../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateResolverSpecFileData = ({ modelName }: IProps) => {
	const data = `import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ${modelName.plural.pascalCase}Service } from './${modelName.plural.paramCase}.service';
import { ${modelName.plural.pascalCase}Resolver } from './${modelName.plural.paramCase}.resolver';

describe('${modelName.plural.pascalCase}Resolver', () => {
	let resolver: ${modelName.plural.pascalCase}Resolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [${modelName.plural.pascalCase}Resolver, ${modelName.plural.pascalCase}Service, PrismaService],
		}).compile();

		resolver = module.get<${modelName.plural.pascalCase}Resolver>(${modelName.plural.pascalCase}Resolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
`;

	return data;
};

export default generateResolverSpecFileData;
