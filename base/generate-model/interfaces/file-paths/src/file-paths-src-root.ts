import IPath from '../../path';
import IFilePathsDto from './file-paths-dto';
import IFilePathsEnums from './file-paths-enums';

interface IFilePathsSrcRoot {
	dto: IFilePathsDto;
	enums: IFilePathsEnums;
	module: IPath;
	resolver: IPath;
	resolverSpec: IPath;
	service: IPath;
	serviceSpec: IPath;
}

export default IFilePathsSrcRoot;
