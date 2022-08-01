import { RelationType } from '../../enums';
import { IRelatedTo } from '../../interfaces/config';
import IModelAttributeProps from './model-attribute-data';

interface IModelAttributes {
	relatedTo: IRelatedTo;
	all: IModelAttributeProps;
	relationType: RelationType;
	unique: IModelAttributeProps;
	withoutTimeStamps: IModelAttributeProps;
}

export default IModelAttributes;
