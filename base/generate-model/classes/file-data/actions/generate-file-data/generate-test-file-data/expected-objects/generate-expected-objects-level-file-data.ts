import { IFileDataTestExpectedObjects } from '../../../../../../interfaces/file-data';
import { IModel } from '../../../../../../interfaces/model';
import generateExpectedObjectFileData from './generate-file-data/generate-expected-object-file-data';
import generateExpectedObjectWithRelationFileData from './generate-file-data/generate-expected-object-w-relation-file-data';
import generateExpectedObjectWithEmptyRelationFileData from './generate-file-data/generate-expected-object-w-empty-relation-file-data';

interface IProps {
	model: IModel;
}

const generateExpectedObjectsLevelFileData = ({
	model,
}: IProps): IFileDataTestExpectedObjects => {
	const expectedObjectFileData = generateExpectedObjectFileData({
		model,
	});
	const expectedObjectWithRelationFileData =
		generateExpectedObjectWithRelationFileData({
			model,
		});
	const expectedObjectWithEmptyRelationFileData =
		generateExpectedObjectWithEmptyRelationFileData({
			model,
		});

	return {
		expectedObject: {
			data: expectedObjectFileData,
		},
		expectedObjectWithRelation: {
			data: expectedObjectWithRelationFileData,
		},
		expectedObjectWithEmptyRelation: {
			data: expectedObjectWithEmptyRelationFileData,
		},
	};
};

export default generateExpectedObjectsLevelFileData;
