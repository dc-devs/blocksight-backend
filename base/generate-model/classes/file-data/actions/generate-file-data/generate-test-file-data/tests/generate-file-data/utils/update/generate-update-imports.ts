import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneImports = ({ model }: IProps) => {
	let data = '';
	const { hasUniqueProps } = model;
	const firstRecord = hasUniqueProps ? ' firstRecord,' : '';

	data += `import request from 'supertest';
import query from '../queries/update.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import {${firstRecord} allModelsCount } from '../../../../prisma/seeds/${model.name.plural.paramCase}.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';`;

	if (hasUniqueProps) {
		data += Character.LINE_BREAK;
		data += `import { ${model.name.singular.pascalCase}ValidationError } from '../../../../src/models/${model.name.plural.paramCase}/enums';`;
	}

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneImports;
