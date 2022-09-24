import ExtensionCode from './extension-code.enum';
import ErrorCode from '../../prisma/error-code.enum';
import { UserInputError } from 'apollo-server-express';
import { UserValidationError } from '../../models/users/enums';
import { ExchangeValidationError } from '../../models/exchanges/enums';
import { UsersExchangesValidationError } from '../../models/users-exchanges/enums';

const customErrors = {
	[ErrorCode.UNIQUE_CONSTRAINT]: {
		email: () => {
			throw new UserInputError(ExtensionCode.BAD_USER_INPUT, {
				errors: {
					email: {
						type: ExtensionCode.BAD_USER_INPUT,
						message: UserValidationError.EMAIL_IS_TAKEN,
					},
				},
			});
		},
		name: () => {
			throw new UserInputError(ExtensionCode.BAD_USER_INPUT, {
				errors: {
					name: {
						type: ExtensionCode.BAD_USER_INPUT,
						message: ExchangeValidationError.NAME_IS_TAKEN,
					},
				},
			});
		},
		uniqueUserExchange: () => {
			throw new UserInputError(ExtensionCode.BAD_USER_INPUT, {
				errors: {
					uniqueUserExchange: {
						type: ExtensionCode.BAD_USER_INPUT,
						message:
							UsersExchangesValidationError.EXCHANGE_ALREADY_ADDED,
					},
				},
			});
		},
	},
	[ErrorCode.RECORD_NOT_FOUND]: {
		cause: (message: string) => {
			throw new UserInputError(ExtensionCode.BAD_USER_INPUT, {
				errors: {
					cause: {
						type: ExtensionCode.BAD_USER_INPUT,
						message,
					},
				},
			});
		},
	},
};

export default customErrors;
