import { IFileData, IModelAttributes, IModelName } from '../../../interfaces';
import generateServiceFileData from './generate-service-file-data';

interface IProps {
	modelName: IModelName;
	attributes: IModelAttributes;
}

const generateFileData = ({ modelName, attributes }: IProps) => {
	const serviceFileData = generateServiceFileData({ modelName, attributes });

	const paths: IFileData = {
		root: {
			module: {
				data: '',
			},
			resolver: {
				data: '',
			},
			resolverSpec: {
				data: '',
			},
			service: {
				data: serviceFileData,
			},
			serviceSpec: {
				data: '',
			},
		},
	};

	return paths;
};

export default generateFileData;
