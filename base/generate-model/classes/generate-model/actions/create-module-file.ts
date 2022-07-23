import { createFile } from '../utils';
import { IFilePaths } from '../../../interfaces';

interface IProps {
	filePaths: IFilePaths;
}

const createModuleFile = ({ filePaths }: IProps) => {
	createFile({
		file: filePaths.root.module.path,
	});
};

export default createModuleFile;
