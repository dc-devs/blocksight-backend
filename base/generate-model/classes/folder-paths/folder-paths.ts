import { ModelRoot } from '../../interfaces';
import { generateFolderPaths } from './utils';

class FolderPaths {
	modelRoot: ModelRoot;

	constructor(modelNameSnakeCase: string) {
		const paths = generateFolderPaths(modelNameSnakeCase);
		const { modelRoot } = paths;

		this.modelRoot = modelRoot;
	}
}

export default FolderPaths;
