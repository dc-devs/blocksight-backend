import { UserRole, User as PrismaUser } from '@prisma/client';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';
import { TokenBalance } from './token-balance.model';
import { Value } from './value.model';
import CovalentTokenBalances from '../../../interfaces/covalent-token-balance-interface';

@ObjectType()
export class TokenBalances {
	@Field(() => Value, { nullable: true })
	totalValue: Value;

	@Field(() => [TokenBalance], { nullable: true })
	balances: TokenBalance[];
}
