import IPath from '../path';

interface IDto {
	path: string;
	inputs: IPath;
	models: IPath;
	prisma: IPath;
}

export default IDto;
