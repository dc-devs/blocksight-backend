import ITestFindAllWhere from './tests-find-all-where';
import ITestFindAllWhereOr from './tests-find-all-where-or';
import ITestFindAllWhereNot from './tests-find-all-where-not';

interface ITestFindAll {
	where: ITestFindAllWhere;
	whereNot: ITestFindAllWhereNot;
	whereOr: ITestFindAllWhereOr;
}

export default ITestFindAll;
