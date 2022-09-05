import type { Config } from 'jest';

export default async (): Promise<Config> => {
	return {
		verbose: true,
		moduleFileExtensions: ['js', 'json', 'ts'],
		rootDir: '../../',
		testEnvironment: 'node',
		testRegex: '.e2e-spec.ts$',
		transform: {
			'^.+\\.(t|j)s$': 'ts-jest',
		},
		setupFilesAfterEnv: ['./helpers/config/setup.ts'],
	};
};
