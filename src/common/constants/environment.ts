import Environment from '../enums/environment.enum';

export default process.env.NODE_ENV || Environment.DEVELOPMENT;

export const isTestEnv = process.env.NODE_ENV === Environment.TEST;

export const isProductionEnv = process.env.NODE_ENV === Environment.PRODUCTION;

export const isDevelopmentEnv =
	process.env.NODE_ENV === Environment.DEVELOPMENT;
