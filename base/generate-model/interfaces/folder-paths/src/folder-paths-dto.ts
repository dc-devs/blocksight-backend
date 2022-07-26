import IPath from '../../path';

interface IFolderPathsDto {
	path: string;
	inputs: IPath;
	models: IPath;
	prisma: IPath;
}

export default IFolderPathsDto;
