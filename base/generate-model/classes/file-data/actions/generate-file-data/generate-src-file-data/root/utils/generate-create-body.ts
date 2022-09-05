import { RelationType, Character } from '../../../../../../../enums';
import { IModel } from '../../../../../../../interfaces/model';

interface IProps {
	model: IModel;
}

const buildVariableDefinitions = ({ attributes }) => {
	let data = '';
	const open = 'const { ';
	const close = ' } = data;';

	data += open;

	Object.keys(attributes).forEach((attribute, index) => {
		const lastIndex = Object.keys(attributes).length - 1 === index;

		if (!lastIndex) {
			data += `${attribute}, `;
		} else {
			data += `${attribute}`;
		}
	});

	data += close;

	return data;
};

const buildReturnValue = ({ attributes }) => {
	let data = '';
	const open =
		`
		return this.prisma.fiatTransfer.create({
		data: {` + Character.LINE_BREAK;
	const close = `},
			select,
		});`;

	data += open;

	Object.keys(attributes).forEach((attribute, index) => {
		const isRelationalAttribute = attribute.match(/Id$/g);

		if (!isRelationalAttribute) {
			data += `${attribute},`;
		} else {
			const relationalAttribute = attribute.replace(/Id$/g, '');
			data += `${relationalAttribute}: { connect: { id: ${attribute} } },`;
		}
	});

	data += close;

	return data;
};

const buildCustomBody = ({ attributes }) => {
	let data = '';

	data += buildVariableDefinitions({ attributes });
	data += Character.LINE_BREAK;
	data += buildReturnValue({ attributes });

	return data;
};

const generateCreateBody = ({ model }: IProps) => {
	let data = '';
	const { isHasOne } = model;
	const { attributeBundles } = model;
	const { withoutTimeStamps } = attributeBundles;
	const { attributes } = withoutTimeStamps;
	const customBody = buildCustomBody({ attributes });
	const defaultBody =
		Character.LINE_BREAK +
		`return this.prisma.${model.name.singular.camelCase}.create({
			data,
			select,
		});` +
		Character.LINE_BREAK;

	if (isHasOne) {
		data += customBody;
	} else {
		data += defaultBody;
	}

	return data;
};

export default generateCreateBody;
