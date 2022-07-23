import IPath from './path';

interface IFileRoot {
	module: IPath;
	resolver: IPath;
	resolverSpec: IPath;
	service: IPath;
	serviceSpec: IPath;
}

export default IFileRoot;
