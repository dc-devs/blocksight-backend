import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneImports = ({ model }: IProps) => {
	let data = '';

	data += `import request from 'supertest';
import query from '../queries/find-one.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expected${model.name.singular.pascalCase}Object from '../expected-objects/expected-${model.name.singular.paramCase}-object';`;

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneImports;
