import ITestFindAllWhere from './tests-find-all-where';
import ITestFindAllWhereNot from './tests-find-all-where-not';

interface ITestFindAll {
	where: ITestFindAllWhere;
	whereNot: ITestFindAllWhereNot;
}

export default ITestFindAll;
