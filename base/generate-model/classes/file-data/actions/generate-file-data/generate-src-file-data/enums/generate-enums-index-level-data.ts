import { IModelName } from '../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generateEnumsIndexFileData = ({ modelName }: IProps) => {
	const data = `import ${modelName.singular.pascalCase}ValidationError from './${modelName.singular.paramCase}-validation-error.enum';

export { ${modelName.singular.pascalCase}ValidationError };`;
	return data;
};

export default generateEnumsIndexFileData;
