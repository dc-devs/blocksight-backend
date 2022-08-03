import { Character } from '../../../../../../../../enums';
import { IModelName } from '../../../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateCreateImports = ({ modelName }: IProps) => {
	let data = '';

	data += `import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { firstRecord } from '../../../../prisma/seeds/${modelName.plural.paramCase}.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import { ${modelName.singular.pascalCase}ValidationError } from '../../../../src/models/${modelName.plural.paramCase}/enums';
import expected${modelName.singular.pascalCase}Object from '../expected-objects/expected-${modelName.singular.paramCase}-object';`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateCreateImports;
