import { execSync } from 'child_process';
import GenerateModel from './classes/generate-model';
import generateModelProps from './config/generate-model-props';

const generateModel = new GenerateModel(generateModelProps);

const srcRootPath = generateModel.folderPaths.src.root.path;
const testRootPath = generateModel.folderPaths.test.root.path;

generateModel.start();

execSync(`pnpm prettier --write ${srcRootPath}`);
execSync(`pnpm prettier --write ${testRootPath}`);
