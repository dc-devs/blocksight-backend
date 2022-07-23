import { createFolder } from '../utils';
import { ModelRoot } from 'base/generate-model/interfaces';

const createModelRootFolder = (modelRoot: ModelRoot) => {
	createFolder(modelRoot.path);
};

export default createModelRootFolder;
