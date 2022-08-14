import ITests from './tests';
import IRelatedTo from './related-to';
import { IModelName } from '../model-name';
import { RelationType } from '../../enums';
import IAttributeBundles from './attribute-bundles';
import IRelationalModelNames from './relational-model-names';

interface IModel {
	tests: ITests;
	name: IModelName;
	isHasOne: boolean;
	isHasMany: boolean;
	isManyToMany: boolean;
	relatedTo: IRelatedTo;
	hasUniqueProps: boolean;
	hasJSONAttribute: boolean;
	relationType: RelationType;
	attributeBundles: IAttributeBundles;
	relationalModelNames: IRelationalModelNames;
}

export default IModel;
