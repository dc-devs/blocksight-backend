import { IModelName } from '../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateServiceSpecData = ({ modelName }: IProps) => {
	const data = `import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ${modelName.plural.pascalCase}Service } from './${modelName.plural.paramCase}.service';

describe('${modelName.plural.pascalCase}Service', () => {
	let service: ${modelName.plural.pascalCase}Service;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [${modelName.plural.pascalCase}Service, PrismaService],
		}).compile();

		service = module.get<${modelName.plural.pascalCase}Service>(${modelName.plural.pascalCase}Service);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

`;

	return data;
};

export default generateServiceSpecData;
