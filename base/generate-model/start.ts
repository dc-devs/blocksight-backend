import GenerateModel from './classes/generate-model';
import generateModelProps from './config/generate-model-props';
const generateModel = new GenerateModel(generateModelProps);

generateModel.start();
