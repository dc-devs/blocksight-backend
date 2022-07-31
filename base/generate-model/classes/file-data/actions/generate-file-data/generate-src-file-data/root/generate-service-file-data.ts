import { IModelName } from '../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import generateSelectAttributes from '../../../../utils/generate-select-attributes';
import generateUniqueAttributesObject from '../../../../utils/generate-unique-attributes-object';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateServiceFileData = ({ modelName, modelAttributes }: IProps) => {
	const { all, unique, relationType, relatedTo } = modelAttributes;
	const { attributes: allAttributes } = all;
	const { attributes: uniqueAttributes } = unique;
	const select = generateSelectAttributes({
		relatedTo,
		relationType,
		attributes: allAttributes,
	});
	const uniqueAttributesObject = generateUniqueAttributesObject({
		attributes: uniqueAttributes,
	});
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
		const ${uniqueAttributesObject} = findOne${modelName.singular.pascalCase}Input;

		return this.prisma.${modelName.singular.camelCase}.findUnique({
			where: ${uniqueAttributesObject},
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
