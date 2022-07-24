import { IModelName } from '../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateModuleFileData = ({ modelName }: IProps) => {
	const data = `import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ${modelName.plural.pascalCase}Service } from './${modelName.plural.paramCase}.service';
import { ${modelName.plural.pascalCase}Resolver } from './${modelName.plural.paramCase}.resolver';

@Module({
	providers: [${modelName.plural.pascalCase}Resolver, ${modelName.plural.pascalCase}Service, PrismaService],
	exports: [${modelName.plural.pascalCase}Service],
})
export class ${modelName.plural.pascalCase}Module {}
`;

	return data;
};

export default generateModuleFileData;
