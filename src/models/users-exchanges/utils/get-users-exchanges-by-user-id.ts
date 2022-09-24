import { PrismaService } from '../../../prisma/prisma.service';
import { UsersExchanges } from '../dto/models/users-exchanges.model';

interface Options {
	userId: number;
	prisma: PrismaService;
}

const getUsersExchangesByUserId = async ({
	userId,
	prisma,
}: Options): Promise<UsersExchanges[]> => {
	return await prisma.usersExchanges.findMany({
		where: {
			userId,
		},
		select: {
			id: true,
			exchange: true,
			userId: true,
			exchangeId: true,
			apiKey: true,
			apiSecret: true,
			apiPassphrase: true,
			apiNickname: true,
			createdAt: true,
			updatedAt: true,
		},
	});
};

export default getUsersExchangesByUserId;
