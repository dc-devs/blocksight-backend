import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createPrismaLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: '',
		file: filePaths.root.dto.prisma.index.path,
	});
	
	createFile({
		data: '',
		file: filePaths.root.dto.prisma.cursor.path,
	});
	
	createFile({
		data: '',
		file: filePaths.root.dto.prisma.order.path,
	});
	
	createFile({
		data: '',
		file: filePaths.root.dto.prisma.where.path,
	});
	
	createFile({
		data: '',
		file: filePaths.root.dto.prisma.model.path,
	});
};

export default createPrismaLevelFiles;
