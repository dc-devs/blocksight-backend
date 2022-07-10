import { Exchange } from './models/exchange.model';
import { ExchangesService } from './exchanges.service';
import { UpdateExchangeInput } from './dto/update-exchange.input';
import { FindOneExchangeInput } from './dto/find-one-exchange.input';
import { FindAllExchangesInput } from './dto/find-all-exchanges.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../../graphql/errors/generate-graphql-error';

@Resolver(() => Exchange)
export class ExchangesResolver {
	constructor(private readonly exchangesService: ExchangesService) {}

	@Query(() => [Exchange])
	findAllExchanges(
		@Args('findAllExchangesInput')
		findAllExchangesInput: FindAllExchangesInput,
	): Promise<Exchange[]> {
		return this.exchangesService.findAll(findAllExchangesInput);
	}

	@Query(() => Exchange, { nullable: true })
	findOneExchange(
		@Args('findOneExchangeInput')
		findOneExchangeInput: FindOneExchangeInput,
	): Promise<Exchange | null> {
		return this.exchangesService.findOne(findOneExchangeInput);
	}

	@Mutation(() => Exchange)
	async updateExchange(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateExchangeInput') updateExchangeInput: UpdateExchangeInput,
	): Promise<Exchange> {
		try {
			return await this.exchangesService.update(id, updateExchangeInput);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	// @Mutation(() => Exchange)
	// deleteExchange(
	// 	@Args('id', { type: () => Int }) id: number,
	// ): Promise<Exchange> {
	// 	return this.exchangesService.delete(id);
	// }
}
