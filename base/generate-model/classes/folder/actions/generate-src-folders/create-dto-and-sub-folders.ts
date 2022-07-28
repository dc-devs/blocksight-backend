import { createFolder } from '../../utils';
import { IFolderPathsSrcRoot } from '../../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathsSrcRoot;
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
