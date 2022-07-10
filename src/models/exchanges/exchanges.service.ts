import { Injectable } from '@nestjs/common';
import { Exchange } from './models/exchange.model';
import { UpdateExchangeInput } from './dto/update-exchange.input';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneExchangeInput } from './dto/find-one-exchange.input';
import { FindAllExchangesInput } from './dto/find-all-exchanges.input';
// import { UserWithPassword } from './models/user-with-password.model';
// import { CreateUserEmailInput } from './dto/create-user-email.input';
// import { CreateUserAddressInput } from './dto/create-user-address.input';

const select = {
	id: true,
	name: true,
	websiteUrl: true,
	logoUrl: true,
	companyLogoUrl: true,
	hasApi: true,
	hasCsv: true,
	// TODO: FIX
	// users: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class ExchangesService {
	constructor(private prisma: PrismaService) {}

	findAll(findAllExchangesInput: FindAllExchangesInput): Promise<Exchange[]> {
		const { skip, cursor, take, orderBy, where } = findAllExchangesInput;
		return this.prisma.exchange.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	async findOne(
		findOneExchangeInput: FindOneExchangeInput,
	): Promise<Exchange | null> {
		const { id, name } = findOneExchangeInput;

		return this.prisma.exchange.findUnique({
			where: { id, name },
			select,
		});
	}

	// create(createUserEmailInput: CreateUserEmailInput): Promise<User> {
	// 	const { email, password } = createUserEmailInput;
	// 	const encodedPassword = encodePassword(password);
	// 	const emailLowerCase = email.toLowerCase();

	// 	return this.prisma.exchange.create({
	// 		data: {
	// 			email: emailLowerCase,
	// 			password: encodedPassword,
	// 		},
	// 		select,
	// 	});
	// }

	// async createOrGetFromAddress(
	// 	createUserAddressInput: CreateUserAddressInput,
	// ): Promise<User> {
	// 	const { primaryWalletAddress } = createUserAddressInput;
	// 	let user;

	// 	user = await this.findOne({ primaryWalletAddress });

	// 	if (!user) {
	// 		const password = uuidv4();
	// 		const encodedPassword = encodePassword(password);
	// 		user = this.prisma.exchange.create({
	// 			data: {
	// 				primaryWalletAddress,
	// 				password: encodedPassword,
	// 			},
	// 			select,
	// 		});
	// 	}

	// 	return user;
	// }

	update(id: number, data: UpdateExchangeInput): Promise<Exchange> {
		return this.prisma.exchange.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	// delete(id: number): Promise<User> {
	// 	return this.prisma.exchange.delete({
	// 		where: {
	// 			id,
	// 		},
	// 		select,
	// 	});
	// }
}
