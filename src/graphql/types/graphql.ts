
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum SortOrder {
    asc = "asc",
    desc = "desc"
}

export class LoginInput {
    email: string;
    password: string;
}

export class UserOrderByInput {
    id?: Nullable<SortOrder>;
    email?: Nullable<SortOrder>;
    role?: Nullable<SortOrder>;
    createdAt?: Nullable<SortOrder>;
    updatedAt?: Nullable<SortOrder>;
}

export class UserWhereInput {
    AND?: Nullable<Nullable<UserWhereInput>[]>;
    OR?: Nullable<Nullable<UserWhereInput>[]>;
    NOT?: Nullable<Nullable<UserWhereInput>[]>;
    id?: Nullable<number>;
    email?: Nullable<string>;
    role?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class UserWhereUniqueInput {
    id?: Nullable<number>;
    email?: Nullable<string>;
}

export class CreateUserInput {
    email: string;
    password: string;
}

export class UpdateUserInput {
    email?: Nullable<string>;
}

export class User {
    __typename?: 'User';
    id: number;
    email: string;
    role: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class LoginResponse {
    __typename?: 'LoginResponse';
    access_token?: Nullable<string>;
    user?: Nullable<User>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: number, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract deleteUser(id: number): User | Promise<User>;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract users(skip?: Nullable<number>, take?: Nullable<number>, cursor?: Nullable<UserWhereUniqueInput>, orderBy?: Nullable<UserOrderByInput>, where?: Nullable<UserWhereInput>): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(getUserInput: UserWhereUniqueInput): Nullable<User> | Promise<Nullable<User>>;

    abstract currentUser(getUserInput: UserWhereUniqueInput): Nullable<User> | Promise<Nullable<User>>;
}

export type JSON = any;
export type DateTime = any;
type Nullable<T> = T | null;
