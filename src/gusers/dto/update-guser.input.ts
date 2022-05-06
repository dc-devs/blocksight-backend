import { CreateUserInput } from './create-guser.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGuserInput extends PartialType(CreateUserInput) {
	id: number;
}
