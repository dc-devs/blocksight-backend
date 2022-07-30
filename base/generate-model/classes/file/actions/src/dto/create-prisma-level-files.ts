import { createFile } from '../../../utils';
import { IFileData } from '../../../../../interfaces/file-data';
import { IFilePaths } from '../../../../../interfaces/file-paths';

interface IProps {
	fileData: IFileData;
	filePaths: IFilePaths;
}

const createPrismaLevelFiles = ({ fileData, filePaths }: IProps) => {
	createFile({
		data: fileData.src.root.dto.prisma.index.data,
		file: filePaths.src.root.dto.prisma.index.path,
	});

	createFile({
		data: fileData.src.root.dto.prisma.cursor.data,
		file: filePaths.src.root.dto.prisma.cursor.path,
	});

	createFile({
		data: fileData.src.root.dto.prisma.order.data,
		file: filePaths.src.root.dto.prisma.order.path,
	});

	createFile({
		data: fileData.src.root.dto.prisma.where.data,
		file: filePaths.src.root.dto.prisma.where.path,
	});

	createFile({
		data: fileData.src.root.dto.prisma.model.data,
		file: filePaths.src.root.dto.prisma.model.path,
	});
};

export default createPrismaLevelFiles;
