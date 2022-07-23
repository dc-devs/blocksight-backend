import rimraf from 'rimraf';
import GenerateModel from './classes/generate-model';

const modelName = 'UsersExchanges';
const { folderPaths } = new GenerateModel(modelName);
const { modelRoot } = folderPaths;

rimraf(modelRoot.path, () => {});
