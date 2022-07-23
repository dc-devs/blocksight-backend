import { createFolder } from '../utils';
import { IFolderRoot } from '../../../interfaces';

const createDtoAndSubFolders = (modelRoot: IFolderRoot) => {
	const { dto } = modelRoot;
	const { inputs, prisma, models } = dto;

	createFolder(dto.path);
	createFolder(inputs.path);
	createFolder(prisma.path);
	createFolder(models.path);
};

export default createDtoAndSubFolders;
