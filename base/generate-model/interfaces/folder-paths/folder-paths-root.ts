import IPath from '../path';
import IDto from './folder-paths-dto';

interface IFolderPathsRoot {
	dto: IDto;
	path: string;
	enums: IPath;
}

export default IFolderPathsRoot;
