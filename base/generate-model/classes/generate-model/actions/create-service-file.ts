import { createFile } from '../utils';
import { IFilePaths } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
}

const createServiceFile = ({ filePaths }: IProps) => {
	createFile({
		file: filePaths.root.service.path,
	});
};

export default createServiceFile;
