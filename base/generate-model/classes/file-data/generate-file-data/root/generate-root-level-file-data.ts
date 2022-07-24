import { IModelName } from '../../../../interfaces';
import {
	generateModuleFileData,
	generateServiceFileData,
	generateResolverFileData,
	generateServiceSpecFileData,
	generateResolverSpecFileData,
} from '.';

interface IProps {
	modelName: IModelName;
	modelAttributes: any;
}

const generateRootLevelFileData = ({ modelName, modelAttributes }: IProps) => {
	const { attributes } = modelAttributes;
	const moduleFileData = generateModuleFileData({ modelName });
	const resolverFileData = generateResolverFileData({ modelName });
	const serviceSpecFileData = generateServiceSpecFileData({ modelName });
	const resolverSpecFileData = generateResolverSpecFileData({ modelName });
	const serviceFileData = generateServiceFileData({ modelName, attributes });

	return {
		moduleFileData,
		serviceFileData,
		resolverFileData,
		serviceSpecFileData,
		resolverSpecFileData,
	};
};

export default generateRootLevelFileData;
