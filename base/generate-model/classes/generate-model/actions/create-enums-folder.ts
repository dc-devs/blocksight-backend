import { createFolder } from '../utils';
import { ModelRoot } from 'base/generate-model/interfaces';

const createEnumsFolder = (modelRoot: ModelRoot) => {
	const { enums } = modelRoot;

	createFolder(enums.path);
};

export default createEnumsFolder;
