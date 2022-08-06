import ITestFindAllWhere from './tests-find-all-where';
import ITestFindAllWhereOr from './tests-find-all-where-or';
import ITestFindAllWhereNot from './tests-find-all-where-not';
import ITestFindAllPagination from './tests-find-all-pagination';

interface ITestFindAll {
	where: ITestFindAllWhere;
	whereNot: ITestFindAllWhereNot;
	whereOr: ITestFindAllWhereOr;
	pagination: ITestFindAllPagination;
}

export default ITestFindAll;
