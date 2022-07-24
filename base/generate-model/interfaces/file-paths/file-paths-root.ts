import IPath from '../path';
import IFilePathsDto from './file-paths-dto';

interface IFilePathsRoot {
	dto: IFilePathsDto;
	module: IPath;
	resolver: IPath;
	resolverSpec: IPath;
	service: IPath;
	serviceSpec: IPath;
}

export default IFilePathsRoot;
