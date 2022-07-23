import { createFile } from '../utils';
import { IFilePaths } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
}

const createServiceSpecFile = ({ filePaths }: IProps) => {
	createFile({
		file: filePaths.root.serviceSpec.path,
	});
};

export default createServiceSpecFile;
