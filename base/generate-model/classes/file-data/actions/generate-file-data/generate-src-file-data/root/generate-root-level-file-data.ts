import { IModelName } from '../../../../../../interfaces/model-name';
import { IModel } from '../../../../../../interfaces/model';
import {
	generateModuleFileData,
	generateServiceFileData,
	generateResolverFileData,
	generateServiceSpecFileData,
	generateResolverSpecFileData,
} from '.';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateRootLevelFileData = ({ modelName, model }: IProps) => {
	const moduleFileData = generateModuleFileData({ modelName });
	const resolverFileData = generateResolverFileData({ modelName });
	const serviceSpecFileData = generateServiceSpecFileData({ modelName });
	const resolverSpecFileData = generateResolverSpecFileData({ modelName });
	const serviceFileData = generateServiceFileData({
		modelName,
		model,
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
