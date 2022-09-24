import customErrors from './custom-errors';

const generateGraphQLError = (error) => {
	const { code, meta } = error;
	let graphqlError;
	let errorMessage;
	let errorField;

	if (Array.isArray(meta?.target) && meta?.target.length > 0) {
		errorField = meta.target[0];
	}

	if (meta?.cause) {
		errorField = 'cause';
		errorMessage = meta.cause;
	}

	if (customErrors[code] && customErrors[code][errorField]) {
		graphqlError = customErrors[code][errorField];
	}

	if (graphqlError && errorMessage) {
		graphqlError(errorMessage);
	} else if (graphqlError) {
		graphqlError();
	}

	throw new Error(error);
};

export default generateGraphQLError;
