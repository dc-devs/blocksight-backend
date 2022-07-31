import IModelAttributeProps from './model-attribute-data';
import { RelationType } from '../../enums';

interface IModelAttributes {
	relationType: RelationType;
	all: IModelAttributeProps;
	unique: IModelAttributeProps;
	relatedTo: string[] | undefined;
	withoutTimeStamps: IModelAttributeProps;
}

export default IModelAttributes;
