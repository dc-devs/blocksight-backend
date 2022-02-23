import { Get, Controller } from '@nestjs/common';

// @Controller({ host: 'admin.example.com' }) // requires host
@Controller('ping')
export class PingController {
	// @HttpCode(204)
	// @Redirect('https://nestjs.com', 301)
	// @Header('Cache-Control', 'none')
	@Get()
	ping() {
		return { message: 'pong' };
	}
}
