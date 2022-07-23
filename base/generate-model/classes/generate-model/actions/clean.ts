import rimraf from 'rimraf';

interface IProps {
	rootPath: string;
}
const clean = ({rootPath}: IProps) => {
	rimraf(rootPath, () => {});
};

export default clean;
