import { createFolder } from '../../utils';
import { IFolderPathsTestRoot } from '../../../../interfaces/folder-paths';

interface IProps {
	root: IFolderPathsTestRoot;
}

const generateSrcFolders = ({ root }: IProps) => {
	createFolder({
		directory: root.path,
	});

	createFolder({
		directory: root.enums.path,
	});

	createFolder({
		directory: root['expected-objects'].path,
	});
	
	createFolder({
		directory: root.queries.path
	});
	
	createFolder({
		directory: root.tests.path
	});
};

export default generateSrcFolders;
