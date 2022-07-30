import IData from '../data';
import IFileDataDto from './file-data-dto';
import IFileDataEnums from './file-data-enums';

interface IFileDataSrcRoot {
	module: IData;
	service: IData;
	resolver: IData;
	serviceSpec: IData;
	resolverSpec: IData;
	dto: IFileDataDto;
	enums: IFileDataEnums;
}

export default IFileDataSrcRoot;
