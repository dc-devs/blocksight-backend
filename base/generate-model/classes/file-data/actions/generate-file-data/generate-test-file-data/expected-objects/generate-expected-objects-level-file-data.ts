import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestExpectedObjects } from '../../../../../../interfaces/file-data';
import { IModelAttributes } from '../../../../../../interfaces/model-attribute';
import generateExpectedObjectFileData from './generate-file-data/generate-expected-object-level-file-data';

interface IProps {
	modelName: IModelName;
	modelAttributes: IModelAttributes;
}

const generateExpectedObjectsLevelFileData = ({
	modelName,
	modelAttributes,
}: IProps): IFileDataTestExpectedObjects => {
	const expectedObjectFileData = generateExpectedObjectFileData({
		modelName,
		modelAttributes,
	});

	return {
		expectedObject: {
			data: expectedObjectFileData,
		},
	};
};

export default generateExpectedObjectsLevelFileData;
