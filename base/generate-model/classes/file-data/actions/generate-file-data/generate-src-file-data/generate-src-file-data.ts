import { IFileDataSrc } from '../../../../../interfaces/file-data';
import { IModelName } from '../../../../../interfaces/model-name';
import { generateDtoLevelFileData } from './dto';
import { generateRootLevelFileData } from './root';
import { generateEnumsLevelFileData } from './enums';
import { IModel } from '../../../../../interfaces/model';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateSrcFileData = ({ modelName, model }: IProps): IFileDataSrc => {
	const {
		moduleFileData,
		serviceFileData,
		resolverFileData,
		serviceSpecFileData,
		resolverSpecFileData,
	} = generateRootLevelFileData({ modelName, model });

	const dto = generateDtoLevelFileData({
		modelName,
		model,
	});

	const enums = generateEnumsLevelFileData({
		modelName,
		model,
	});

	const paths = {
		root: {
			dto,
			enums,
			module: {
				data: moduleFileData,
			},
			resolver: {
				data: resolverFileData,
			},
			resolverSpec: {
				data: resolverSpecFileData,
			},
			service: {
				data: serviceFileData,
			},
			serviceSpec: {
				data: serviceSpecFileData,
			},
		},
	};

	return paths;
};

export default generateSrcFileData;
