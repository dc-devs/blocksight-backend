
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

export class CreateGuserInput {
    email: string;
    password: string;
}

export class UpdateGuserInput {
    id: number;
    data: string;
}

export class Guser {
    __typename?: 'Guser';
    id: number;
    email: string;
    role: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract gusers(skip?: Nullable<number>, take?: Nullable<number>, cursor?: Nullable<UserWhereUniqueInput>, orderBy?: Nullable<UserOrderByInput>, where?: Nullable<UserWhereInput>): Nullable<Guser>[] | Promise<Nullable<Guser>[]>;

    abstract guser(id: number): Nullable<Guser> | Promise<Nullable<Guser>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createGuser(createGuserInput: CreateGuserInput): Guser | Promise<Guser>;

    abstract updateGuser(updateGuserInput: UpdateGuserInput): Guser | Promise<Guser>;

    abstract removeGuser(id: number): Nullable<Guser> | Promise<Nullable<Guser>>;
}

export type JSON = any;
export type DateTime = any;
type Nullable<T> = T | null;
