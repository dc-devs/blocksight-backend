import { IFileData } from '../../../interfaces/file-data';
import { IModelName, IModelAttributes } from '../../../interfaces';
import { generateDtoLevelFileData } from '../generate-file-data/dto';
import { generateRootLevelFileData } from '../generate-file-data/root';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateFileData = ({ modelName, modelAttributes }: IProps) => {
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

	const paths: IFileData = {
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

export default generateFileData;
