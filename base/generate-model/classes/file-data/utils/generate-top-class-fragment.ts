import { Character } from '../../../enums';

interface IProps {
	decorator: string;
	className: string;
}

const generateTopClassFragment = ({ className, decorator }: IProps) => {
	let data = '';

	data += `@${decorator}()` + Character.LINE_BREAK;
	data += `export class ${className} {`;
	data += Character.LINE_BREAK;

	return data;
};

export default generateTopClassFragment;
