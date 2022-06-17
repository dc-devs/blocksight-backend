import { AuthService } from '../auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IsSignedDataMetaMask implements CanActivate {
	constructor(private authService: AuthService) {}

	async canActivate(executionContext: ExecutionContext) {
		try {
			const ctx = GqlExecutionContext.create(executionContext);
			const { signInMetaMaskInput } = ctx.getArgs();

			const isSignedData =
				await this.authService.validateSignedDataMetamask(
					signInMetaMaskInput,
				);

			if (!isSignedData) {
				throw new UnauthorizedException();
			}

			return isSignedData;
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
