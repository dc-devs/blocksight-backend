import { createFile } from '../utils';
import { IFilePaths } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
}

const createResolverSpecFile = ({ filePaths }: IProps) => {
	createFile({
		file: filePaths.root.resolverSpec.path,
	});
};

export default createResolverSpecFile;
