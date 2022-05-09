import ExtensionCode from './extension-code.enum';
import ErrorCode from '../../prisma/error-code.enum';
import { UserInputError } from 'apollo-server-express';
import UserValidationError from '../../users/validation/user-validation-error.enum';

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
};

export default userErrors;