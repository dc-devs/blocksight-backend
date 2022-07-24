import { generateDtoLevelFileData } from '../generate-file-data/dto';
import { generateRootLevelFileData } from '../generate-file-data/root';
import {
	IFileData,
	IModelAttributesInput,
	IModelName,
} from '../../../interfaces';

interface IProps {
	modelName: IModelName;
	modelAttributes: any;
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
