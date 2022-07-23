import { createFolder } from '../utils';
import { IFolderRoot } from '../../../interfaces';

interface IProps {
	root: IFolderRoot;
}

const createDtoAndSubFolders = ({ root }: IProps) => {
	const { dto } = root;
	const { inputs, prisma, models } = dto;

	createFolder({
		directory: dto.path,
	});

	createFolder({
		directory: inputs.path,
	});

	createFolder({
		directory: prisma.path,
	});

	createFolder({
		directory: models.path,
	});
};

export default createDtoAndSubFolders;
