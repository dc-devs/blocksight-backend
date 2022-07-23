import rimraf from 'rimraf';
import { join } from 'path';
import { FilePath } from 'base/enums';
import { paramCase, pascalCase } from 'change-case';
import { createFile, createFolder } from '../utils';

const modelName = 'UsersExchanges';
const modelNamePascalCase = modelName;
const modelNameSnakeCase = paramCase(modelName);

const config = {
	modelNameSnakeCase,
	modelNamePascalCase,
};

const baseFolderPath = join(
	__dirname,
	'..',
	'..',
	'..',
	FilePath.MODELS,
	modelNameSnakeCase,
);

const dtoFolderPath = join(baseFolderPath, 'dto');
const enumsFolderPath = join(baseFolderPath, 'enums');

rimraf(baseFolderPath, () => {});

createFolder(baseFolderPath);
createFolder(dtoFolderPath);
createFolder(enumsFolderPath);

console.log(baseFolderPath);
