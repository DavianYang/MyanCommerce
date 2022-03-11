export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AdministratorDto = {
  __typename?: 'AdministratorDto';
  createdAt: Scalars['DateTime'];
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type CreateAdministratorInput = {
  emailAddress: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  roleIds: Array<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAdministrator: AdministratorDto;
  createRole: Role;
  updateAdministrator: AdministratorDto;
};


export type MutationCreateAdministratorArgs = {
  input: CreateAdministratorInput;
};


export type MutationCreateRoleArgs = {
  input: RoleWhereInput;
};

export type Query = {
  __typename?: 'Query';
  administrator: AdministratorDto;
  administrators: Array<AdministratorDto>;
};


export type QueryAdministratorArgs = {
  id: Scalars['String'];
};


export type QueryAdministratorsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ID'];
};

export type RoleWhereInput = {
  code: Scalars['String'];
  description: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export type AdministratorFragment = { __typename?: 'AdministratorDto', id: string, firstName: string, lastName: string, emailAddress: string, user: { __typename?: 'User', id: string, identifier: string, lastLogin?: any | null | undefined, roles: Array<{ __typename?: 'Role', id: string, code: string, description: string }> } };

export type CreateAdministratorMutationVariables = Exact<{
  input: CreateAdministratorInput;
}>;


export type CreateAdministratorMutation = { __typename?: 'Mutation', createAdministrator: { __typename?: 'AdministratorDto', id: string, firstName: string, lastName: string, emailAddress: string, user: { __typename?: 'User', id: string, identifier: string, lastLogin?: any | null | undefined, roles: Array<{ __typename?: 'Role', id: string, code: string, description: string }> } } };

export type GetAdministratorQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAdministratorQuery = { __typename?: 'Query', administrator: { __typename?: 'AdministratorDto', id: string, firstName: string, lastName: string, emailAddress: string, user: { __typename?: 'User', id: string, identifier: string, lastLogin?: any | null | undefined, roles: Array<{ __typename?: 'Role', id: string, code: string, description: string }> } } };

export namespace Administrator {
  export type Fragment = AdministratorFragment;
  export type User = AdministratorFragment['user'];
  export type Roles = AdministratorFragment['user']['roles'][number];
}

export namespace CreateAdministrator {
  export type Variables = CreateAdministratorMutationVariables;
  export type Mutation = CreateAdministratorMutation;
  export type CreateAdministrator = CreateAdministratorMutation['createAdministrator'];
}

export namespace GetAdministrator {
  export type Variables = GetAdministratorQueryVariables;
  export type Query = GetAdministratorQuery;
  export type Administrator = GetAdministratorQuery['administrator'];
}
