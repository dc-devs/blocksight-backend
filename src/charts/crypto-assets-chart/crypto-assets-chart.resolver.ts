import { CryptoAssetsChartService } from './crypto-assets-chart.service';
import { CryptoAssetsChartDataPoint } from './dto/models/crypto-assets-chart-data-point.model';
import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver(() => [CryptoAssetsChartDataPoint])
export class CryptoAssetsChartResolver {
	constructor(
		private readonly cryptoAssetsChartService: CryptoAssetsChartService,
	) {}

	@Query(() => [CryptoAssetsChartDataPoint])
	getCryptoAssetsChartData(
		@Args('userId')
		userId: number,
	): Promise<CryptoAssetsChartDataPoint[]> {
		return this.cryptoAssetsChartService.getCryptoAssetsChartData({
			userId,
		});
	}
}
