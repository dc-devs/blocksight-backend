import GenerateModel from './classes/generate-model';

const modelName = 'UsersExchanges';
const generateModel = new GenerateModel(modelName);

generateModel.createNewModelFolders();

// const moduleFilePath = join(baseFolderPath, `${modelNameSnakeCase}.module.ts`);
// createFile({
// 	file: moduleFilePath,
// });

// const modelResolverFilePath = join(
// 	baseFolderPath,
// 	`${modelNameSnakeCase}.resolver.ts`,
// );
// createFile({
// 	file: modelResolverFilePath,
// });

// const modelResolverSpecFilePath = join(
// 	baseFolderPath,
// 	`${modelNameSnakeCase}.resolver.spec.ts`,
// );
// createFile({
// 	file: modelResolverSpecFilePath,
// });

// const modelServiceFilePath = join(
// 	baseFolderPath,
// 	`${modelNameSnakeCase}.service.ts`,
// );
// createFile({
// 	file: modelServiceFilePath,
// });

// const modelServiceSpecFilePath = join(
// 	baseFolderPath,
// 	`${modelNameSnakeCase}.service.spec.ts`,
// );
// createFile({
// 	file: modelServiceSpecFilePath,
// });

// // Create dto folder and files
// createFolder(dtoFolderPath);

// createFolder(inputsFolderPath);
// createFolder(modelsFolderPath);
// createFolder(prismaFolderPath);

// // Create enums folder structure
// createFolder(enumsFolderPath);
