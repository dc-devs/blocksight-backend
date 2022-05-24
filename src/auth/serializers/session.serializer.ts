import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
	// passed in from locaStrategy..
	serializeUser(user: User, done: (error: Error, user: User) => void) {
		console.log('');
		console.log('[SessionSerializer:serializeUser] User', user);
		console.log('');
		// can update to {id: user.id} to keep user session small

		done(null, user || { id: 10 });
	}

	deserializeUser(
		payload: User,
		done: (error: Error, payload: User) => void,
	) {
		console.log('');
		console.log('[SessionSerializer:deserializeUser] Payload', payload);
		console.log('');
		// can return full deserialized usersService.findById so have full user..
		done(null, payload);
	}
}
