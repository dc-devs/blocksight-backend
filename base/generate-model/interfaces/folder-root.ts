import IPath from './path';

interface Dto {
	path: string;
	inputs: IPath;
	models: IPath;
	prisma: IPath;
}

interface ModelRoot {
	path: string;
	dto: Dto;
	enums: IPath;
}

export default ModelRoot;
