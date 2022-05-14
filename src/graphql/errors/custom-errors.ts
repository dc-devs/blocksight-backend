import ExtensionCode from './extension-code.enum';
import ErrorCode from '../../prisma/error-code.enum';
import { UserInputError } from 'apollo-server-express';
import UserValidationError from '../../users/validation-errors/user-validation-error.enum';

const userErrors = {
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
	},
	[ErrorCode.RECORD_NOT_FOUND]: {
		cause: (message: string) => {
			throw new UserInputError(ExtensionCode.BAD_USER_INPUT, {
				errors: {
					cause: {
						type: ExtensionCode.BAD_USER_INPUT,
						message
					},
				},
			});
		},
	},
};

export default userErrors;