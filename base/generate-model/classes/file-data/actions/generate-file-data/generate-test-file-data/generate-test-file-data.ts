import { IFileDataTest } from '../../../../../interfaces/file-data';
import { IModelName } from '../../../../../interfaces/model-name';
import { IModelAttributes } from '../../../../../interfaces/model-attribute';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateTestFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataTest => {
	const paths = {
		root: {
			enums: {
				errorMessage: {
					data: 'errorMessage',
				},
			},
			expectedObjects: {
				expectedObject: {
					data: 'expectedObject',
				},
			},
			queries: {
				create: {
					data: 'create',
				},
				delete: {
					data: 'delete',
				},
				findAll: {
					data: 'findAll',
				},
				findOne: {
					data: 'findOne',
				},
				update: {
					data: 'update',
				},
			},
			tests: {
				index: {
					data: 'index',
				},
				create: {
					data: 'create',
				},
				delete: {
					data: 'delete',
				},
				findAll: {
					data: 'findAll',
				},
				findOne: {
					data: 'findOne',
				},
				update: {
					data: 'upddate',
				},
			},
		},
	};

	return paths;
};

export default generateTestFileData;
