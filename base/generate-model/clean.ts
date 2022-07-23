import rimraf from 'rimraf';
import GenerateModel from './classes/generate-model';

const modelName = 'UsersExchanges';
const { folderPaths } = new GenerateModel(modelName);
const { root } = folderPaths;

rimraf(root.path, () => {});
