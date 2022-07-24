import { IModelName } from '../../../../interfaces/model-name';
import { IModelAttributesInput } from '../../../../interfaces/config';
import generateSelectAttributes from '../../utils/generate-select-attributes';

interface IProps {
	modelName: IModelName;
	attributes: IModelAttributesInput;
}

const generateServiceFileData = ({ modelName, attributes }: IProps) => {
	const select = generateSelectAttributes({ attributes });
	const data = `import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ${modelName.singular.pascalCase} } from './dto/models/${modelName.singular.paramCase}.model';
import { PrismaService } from '../../prisma/prisma.service';
import {
	Update${modelName.singular.pascalCase}Input,
	Create${modelName.singular.pascalCase}Input,
	FindOne${modelName.singular.pascalCase}Input,
	FindAll${modelName.plural.pascalCase}Input,
} from './dto/inputs';

const select = ${select}

@Injectable()
export class ${modelName.plural.pascalCase}Service {
	constructor(private prisma: PrismaService) {}

	findAll(findAll${modelName.plural.pascalCase}Input: FindAll${modelName.plural.pascalCase}Input): Promise<${modelName.singular.pascalCase}[]> {
		const { skip, cursor, take, orderBy, where } = findAll${modelName.plural.pascalCase}Input;
		return this.prisma.${modelName.singular.camelCase}.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	async findOne(
		findOne${modelName.singular.pascalCase}Input: FindOne${modelName.singular.pascalCase}Input,
	): Promise<${modelName.singular.pascalCase} | null> {
		const { id, name } = findOne${modelName.singular.pascalCase}Input;

		return this.prisma.${modelName.singular.camelCase}.findUnique({
			where: { id, name },
			select,
		});
	}

	create(create${modelName.singular.pascalCase}Input: Create${modelName.singular.pascalCase}Input): Promise<${modelName.singular.pascalCase}> {
		const data = create${modelName.singular.pascalCase}Input as Prisma.${modelName.singular.pascalCase}CreateInput;

		return this.prisma.${modelName.singular.camelCase}.create({
			data,
			select,
		});
	}

	update(id: number, data: Update${modelName.singular.pascalCase}Input): Promise<${modelName.singular.pascalCase}> {
		return this.prisma.${modelName.singular.camelCase}.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	delete(id: number): Promise<${modelName.singular.pascalCase}> {
		return this.prisma.${modelName.singular.camelCase}.delete({
			where: {
				id,
			},
			select,
		});
	}
}
`;

	return data;
};

export default generateServiceFileData;
