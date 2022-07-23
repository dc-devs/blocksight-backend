import IData from './data';

interface IFileDataRoot {
	module: IData;
	resolver: IData;
	resolverSpec: IData;
	service: IData;
	serviceSpec: IData;
}

export default IFileDataRoot;
