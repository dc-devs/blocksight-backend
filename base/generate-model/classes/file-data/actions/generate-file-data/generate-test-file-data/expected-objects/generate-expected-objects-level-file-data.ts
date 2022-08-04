import { IModelName } from '../../../../../../interfaces/model-name';
import { IFileDataTestExpectedObjects } from '../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../interfaces/model';
import generateExpectedObjectFileData from './generate-file-data/generate-expected-object-level-file-data';

interface IProps {
	modelName: IModelName;
	model: IModel;
}

const generateExpectedObjectsLevelFileData = ({
	modelName,
	model,
}: IProps): IFileDataTestExpectedObjects => {
	const expectedObjectFileData = generateExpectedObjectFileData({
		modelName,
		model,
	});

	return {
		expectedObject: {
			data: expectedObjectFileData,
		},
	};
};

export default generateExpectedObjectsLevelFileData;
