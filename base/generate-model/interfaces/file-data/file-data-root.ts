import IData from './data';
import IFileDataDto from './file-data-dto';

interface IFileDataRoot {
	dto: IFileDataDto;
	module: IData;
	resolver: IData;
	resolverSpec: IData;
	service: IData;
	serviceSpec: IData;
}

export default IFileDataRoot;
