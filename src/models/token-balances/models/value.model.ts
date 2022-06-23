import BigNumber from 'bignumber.js';
import { UserRole, User as PrismaUser } from '@prisma/client';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsEmail, IsDate } from 'class-validator';
import TokenBalance from '../interfaces/token-balance-interface';

@ObjectType()
export class Value {
	@Field({ nullable: true })
	number?: string;

	@Field({ nullable: true })
	formatted?: string;
}
