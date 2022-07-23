import GenerateModel from './classes/generate-model';

const modelNamePluralPascalCase = 'UsersExchanges';

const generateModel = new GenerateModel({
	modelNamePluralPascalCase,
	isManyToMany: true,
	attributes: {
		user: true,
		userId: true,
		exchange: true,
		exchangeId: true,
		createdAt: true,
		updatedAt: true,
	},
});

generateModel.start();
