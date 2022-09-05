import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateDeleteImports = ({ model }: IProps) => {
	let data = '';

	data += `import request from 'supertest';
import query from '../queries/delete.query';
import ErrorMessage from '../enums/error-message.enum';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/${model.name.plural.paramCase}.seed';
import expected${model.name.singular.pascalCase}Object from '../expected-objects/expected-${model.name.singular.paramCase}-object';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateDeleteImports;
