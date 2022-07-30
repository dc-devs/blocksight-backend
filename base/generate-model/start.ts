import { execSync } from 'child_process';
import GenerateModel from './classes/generate-model';
import generateModelProps from './config/generate-model-props';

const generateModel = new GenerateModel(generateModelProps);

const srcRootPath = generateModel.folderPaths.src.root.path;
const testRootPath = generateModel.folderPaths.test.root.path;

generateModel.start();

execSync(`yarn prettier --write ${srcRootPath}`);
execSync(`yarn prettier --write ${testRootPath}`);
