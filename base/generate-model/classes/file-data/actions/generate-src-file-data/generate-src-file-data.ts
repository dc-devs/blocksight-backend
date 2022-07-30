import { IFileDataSrc } from '../../../../interfaces/file-data';
import { IModelName } from '../../../../interfaces/model-name';
import { generateDtoLevelFileData } from './dto';
import { IModelAttributes } from '../../../../interfaces/model-attribute';
import { generateRootLevelFileData } from './root';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateSrcFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataSrc => {
	const {
		moduleFileData,
		serviceFileData,
		resolverFileData,
		serviceSpecFileData,
		resolverSpecFileData,
	} = generateRootLevelFileData({ modelName, modelAttributes });

	const dto = generateDtoLevelFileData({
		modelName,
		modelAttributes,
	});

	const paths = {
		root: {
			dto,
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
