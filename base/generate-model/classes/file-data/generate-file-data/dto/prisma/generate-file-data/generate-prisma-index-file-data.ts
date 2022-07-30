import { IModelName } from '../../../../../../interfaces/model-name';

interface IProps {
	modelName: IModelName;
}

const generatePrismaIndexFileData = ({ modelName }: IProps) => {
	const data = `import { ${modelName.singular.pascalCase}Input } from './${modelName.singular.paramCase}.input';
import { ${modelName.singular.pascalCase}Cursor } from './${modelName.singular.paramCase}-cursor.input';
import { ${modelName.singular.pascalCase}WhereInput } from './${modelName.singular.paramCase}-where.input';
import { ${modelName.singular.pascalCase}OrderByInput } from './${modelName.singular.paramCase}-order-by.input';

export { ${modelName.singular.pascalCase}Input, ${modelName.singular.pascalCase}Cursor, ${modelName.singular.pascalCase}WhereInput, ${modelName.singular.pascalCase}OrderByInput };`;

	return data;
};

export default generatePrismaIndexFileData;
