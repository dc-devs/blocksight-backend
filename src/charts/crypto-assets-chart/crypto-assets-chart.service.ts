import { Injectable } from '@nestjs/common';
import { FiatTransfersService } from '../../models/fiat-transfers/fiat-transfers.service';
import { CryptoAssetsChartDataPoint } from './dto/models/crypto-assets-chart-data-point.model';

interface IGetCryptoAssetsChartDataOptions {
	userId: number;
}

@Injectable()
export class CryptoAssetsChartService {
	constructor(private fiatTransfersService: FiatTransfersService) {}

	async getCryptoAssetsChartData({
		userId,
	}: IGetCryptoAssetsChartDataOptions): Promise<
		CryptoAssetsChartDataPoint[]
	> {
		return await this.fiatTransfersService.getWorkingFiatChartDataPoints({
			userId,
		});
	}
}
