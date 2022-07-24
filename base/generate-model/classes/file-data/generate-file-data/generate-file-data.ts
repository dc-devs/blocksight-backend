import { generateDtoLevelFileData } from '../generate-file-data/dto';
import { generateRootLevelFileData } from '../generate-file-data/root';
import { IFileData, IModelAttributes, IModelName } from '../../../interfaces';

interface IProps {
	modelName: IModelName;
	attributes: IModelAttributes;
}

const generateFileData = ({ modelName, attributes }: IProps) => {
	const {
		moduleFileData,
		serviceFileData,
		resolverFileData,
		serviceSpecFileData,
		resolverSpecFileData,
	} = generateRootLevelFileData({ modelName, attributes });

	const dto = generateDtoLevelFileData({
		modelName,
		attributes,
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
