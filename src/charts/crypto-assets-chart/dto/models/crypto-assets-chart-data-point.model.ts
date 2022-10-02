import { Value } from '../../../../common/dto/value';
import { IsNumber, IsString } from 'class-validator';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CryptoAssetsChartDataPoint {
	@IsString()
	@Field()
	date: string;

	@IsString()
	@Field()
	workingFiat: string;
}
