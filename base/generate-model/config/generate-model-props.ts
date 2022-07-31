import { RelationType } from '../enums';
import { IGenerateModelConstructorProps } from '../interfaces/config';

// TODO for many-to-many - relation

//  add to model
// import { User } from '../../../users/dto/models/user.model';
// import { Exchange } from '../../../exchanges/dto/models/exchange.model';
// ...
// ...
// @Field(() => Exchange, { nullable: true })
// exchange?: Exchange;

// @Field(() => User, { nullable: true })
// user?: User;

const modelNamePluralPascalCase = 'UsersExchanges';

const config: IGenerateModelConstructorProps = {
	modelNamePluralPascalCase,
	relationType: RelationType.MANY_TO_MANY,
	relatedTo: ['User','Exchange'],
	attributes: {
		userId: {
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		exchangeId: {
			typeScriptType: 'number',
			classValidators: ['IsNumber'],
		},
		createdAt: {
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
		updatedAt: {
			typeScriptType: 'Date',
			classValidators: ['IsDate'],
		},
	},
};

export default config;
