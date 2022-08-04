import IRelatedTo from './related-to';
import { IModelName } from '../model-name';
import { RelationType } from '../../enums';
import IAttributeBundles from './attribute-bundles';
import IRelationalModelNames from './relational-model-names';

interface IModel {
	name: IModelName;
	relatedTo: IRelatedTo;
	hasUniqueProps: boolean;
	relationType: RelationType;
	attributeBundles: IAttributeBundles;
	relationalModelNames: IRelationalModelNames;
}

export default IModel;