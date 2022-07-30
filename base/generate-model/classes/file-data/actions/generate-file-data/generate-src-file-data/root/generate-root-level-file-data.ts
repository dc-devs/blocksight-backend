import { IModelName } from '../../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import {
	generateModuleFileData,
	generateServiceFileData,
	generateResolverFileData,
	generateServiceSpecFileData,
	generateResolverSpecFileData,
} from '.';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateRootLevelFileData = ({ modelName, modelAttributes }: IProps) => {
	const moduleFileData = generateModuleFileData({ modelName });
	const resolverFileData = generateResolverFileData({ modelName });
	const serviceSpecFileData = generateServiceSpecFileData({ modelName });
	const resolverSpecFileData = generateResolverSpecFileData({ modelName });
	const serviceFileData = generateServiceFileData({
		modelName,
		modelAttributes,
	});

	return {
		moduleFileData,
		serviceFileData,
		resolverFileData,
		serviceSpecFileData,
		resolverSpecFileData,
	};
};

export default generateRootLevelFileData;
