import { Get, Controller } from '@nestjs/common';

@Controller('ping')
export class PingController {
	@Get()
	ping() {
		return { message: 'suck it k8s' };
	}
}
