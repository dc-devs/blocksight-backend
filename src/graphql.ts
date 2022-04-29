
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateGuserInput {
    id: number;
    email: string;
    password: string;
    role: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class UpdateGuserInput {
    id: number;
}

export class Guser {
    __typename?: 'Guser';
    id: number;
    email: string;
    password: string;
    role: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export abstract class IQuery {
    __typename?: 'IQuery';

    abstract gusers(): Nullable<Guser>[] | Promise<Nullable<Guser>[]>;

    abstract guser(id: number): Nullable<Guser> | Promise<Nullable<Guser>>;
}

export abstract class IMutation {
    __typename?: 'IMutation';

    abstract createGuser(createGuserInput: CreateGuserInput): Guser | Promise<Guser>;

    abstract updateGuser(updateGuserInput: UpdateGuserInput): Guser | Promise<Guser>;

    abstract removeGuser(id: number): Nullable<Guser> | Promise<Nullable<Guser>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
