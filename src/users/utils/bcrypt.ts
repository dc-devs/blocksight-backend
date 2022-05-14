import { genSaltSync, hashSync } from 'bcrypt';

const encodePassword = (password: string): string => {
	const saltRounds = 10;
	const salt = genSaltSync(saltRounds);

	return hashSync(password, salt);
};

export { encodePassword };
