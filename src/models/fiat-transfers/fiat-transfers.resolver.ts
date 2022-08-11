import { FiatTransfersService } from './fiat-transfers.service';
import { FiatTransfer } from './dto/models/fiat-transfer.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import generateGraphQLError from '../../graphql/errors/generate-graphql-error';
import {
	UpdateFiatTransferInput,
	CreateFiatTransferInput,
	FindOneFiatTransferInput,
	FindAllFiatTransfersInput,
} from './dto/inputs';

@Resolver(() => FiatTransfer)
export class FiatTransfersResolver {
	constructor(private readonly fiatTransferService: FiatTransfersService) {}

	@Query(() => [FiatTransfer])
	findAllFiatTransfers(
		@Args('findAllFiatTransfersInput')
		findAllFiatTransfersInput: FindAllFiatTransfersInput,
	): Promise<FiatTransfer[]> {
		return this.fiatTransferService.findAll(findAllFiatTransfersInput);
	}

	@Query(() => FiatTransfer, { nullable: true })
	findOneFiatTransfer(
		@Args('findOneFiatTransferInput')
		findOneFiatTransferInput: FindOneFiatTransferInput,
	): Promise<FiatTransfer | null> {
		return this.fiatTransferService.findOne(findOneFiatTransferInput);
	}

	@Mutation(() => FiatTransfer)
	async createFiatTransfer(
		@Args('createFiatTransferInput')
		createFiatTransferInput: CreateFiatTransferInput,
	) {
		try {
			return await this.fiatTransferService.create({
				...createFiatTransferInput,
			});
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => FiatTransfer)
	async updateFiatTransfer(
		@Args('id', { type: () => Int }) id: number,
		@Args('updateFiatTransferInput')
		updateFiatTransferInput: UpdateFiatTransferInput,
	): Promise<FiatTransfer> {
		try {
			return await this.fiatTransferService.update(
				id,
				updateFiatTransferInput,
			);
		} catch (error) {
			generateGraphQLError(error);
		}
	}

	@Mutation(() => FiatTransfer)
	deleteFiatTransfer(
		@Args('id', { type: () => Int }) id: number,
	): Promise<FiatTransfer> {
		return this.fiatTransferService.delete(id);
	}
}
