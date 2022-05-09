import customErrors from './custom-errors';

const generateGraphQLError = (error) => {
	const { code, meta } = error;
	const errorField = meta.target[0];
	const graphqlError = customErrors[code][errorField];

	if (graphqlError) {
		graphqlError();
	}

	throw new Error(error);
};

export default generateGraphQLError;
