import { createFile } from '../utils';
import { IFilePaths } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
}

const createResolverFile = ({ filePaths }: IProps) => {
	createFile({
		file: filePaths.root.resolver.path,
	});
};

export default createResolverFile;
