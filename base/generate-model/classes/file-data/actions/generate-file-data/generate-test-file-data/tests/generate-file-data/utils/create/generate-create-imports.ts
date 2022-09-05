import { Character } from '../../../../../../../../../enums';
import { IModelName } from '../../../../../../../../../interfaces/model-name';
import { IModel } from '../../../../../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateCreateImports = ({ modelName, model }: IProps) => {
	let data = '';
	const { hasUniqueProps } = model;

	data += `import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import expected${modelName.singular.pascalCase}Object from '../expected-objects/expected-${modelName.singular.paramCase}-object';`;

	if (hasUniqueProps) {
		data +=
			`import { firstRecord } from '../../../../prisma/seeds/${modelName.plural.paramCase}.seed'` +
			Character.LINE_BREAK;
		data +=
			`import { ${modelName.singular.pascalCase}ValidationError } from '../../../../src/models/${modelName.plural.paramCase}/enums';` +
			Character.LINE_BREAK;
	}

	data += Character.LINE_BREAK;

	return data;
};

export default generateCreateImports;
