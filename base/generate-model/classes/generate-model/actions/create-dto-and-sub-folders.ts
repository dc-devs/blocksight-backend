import { createFolder } from '../utils';
import { ModelRoot } from 'base/generate-model/interfaces';

const createDtoAndSubFolders = (modelRoot: ModelRoot) => {
	const { dto } = modelRoot;
	const { inputs, prisma, models } = dto;

	createFolder(dto.path);
	createFolder(inputs.path);
	createFolder(prisma.path);
	createFolder(models.path);
};

export default createDtoAndSubFolders;
