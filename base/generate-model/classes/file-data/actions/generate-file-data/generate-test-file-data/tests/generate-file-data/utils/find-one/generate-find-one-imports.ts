import { Character } from '../../../../../../../../../enums';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const generateFindOneImports = ({ model }: IProps) => {
	let data = '';
	const { hasUniqueProps } = model;

	data += `import request from 'supertest';
import query from '../queries/find-one.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/${model.name.plural.paramCase}.seed';
import expected${model.name.singular.pascalCase}Object from '../expected-objects/expected-${model.name.singular.paramCase}-with-relation-object';`;

	if (hasUniqueProps) {
		data +=
			`import { firstRecord } from '../../../../prisma/seeds/${model.name.plural.paramCase}.seed'` +
			Character.LINE_BREAK;
	}

	data += Character.LINE_BREAK;

	return data;
};

export default generateFindOneImports;
