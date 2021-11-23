export type Maybe<T> = T | null;
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
    /**
     * The `DateTime` scalar type represents a DateTime
     * value as specified by
     * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
     */
    DateTime: any;
};

export type CreateTeamMutation = {
    __typename?: 'CreateTeamMutation';
    team?: Maybe<Team>;
};

export type Event = Node & {
    __typename?: 'Event';
    countForTokens: Scalars['Boolean'];
    endDate?: Maybe<Scalars['DateTime']>;
    /** The ID of the object. */
    id: Scalars['ID'];
    name: Scalars['String'];
    startDate?: Maybe<Scalars['DateTime']>;
    teams: TeamConnection;
    type: EventType;
};


export type EventTeamsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    offset?: Maybe<Scalars['Int']>;
};

/** An enumeration. */
export enum EventType {
    /** ASSIGNMENT */
    Assignment = 'ASSIGNMENT',
    /** EXAM */
    Exam = 'EXAM'
}

export type Mutation = {
    __typename?: 'Mutation';
    createTeam?: Maybe<CreateTeamMutation>;
};


export type MutationCreateTeamArgs = {
    eventId: Scalars['ID'];
    name: Scalars['String'];
};

/** An enumeration. */
export enum MyUserRole {
    /** Student */
    Student = 'STUDENT',
    /** Teacher */
    Teacher = 'TEACHER'
}

/** An object with an ID */
export type Node = {
    /** The ID of the object. */
    id: Scalars['ID'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
    __typename?: 'PageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    hello?: Maybe<Scalars['String']>;
    team?: Maybe<Team>;
    teams?: Maybe<TeamConnection>;
};


export type QueryTeamArgs = {
    id: Scalars['ID'];
};


export type QueryTeamsArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    offset?: Maybe<Scalars['Int']>;
};

export type Team = Node & {
    __typename?: 'Team';
    event: Event;
    /** The ID of the object. */
    id: Scalars['ID'];
    name: Scalars['String'];
    users: UserConnection;
};


export type TeamUsersArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    offset?: Maybe<Scalars['Int']>;
};

export type TeamConnection = {
    __typename?: 'TeamConnection';
    /** Contains the nodes in this connection. */
    edges: Array<Maybe<TeamEdge>>;
    /** Pagination data for this connection. */
    pageInfo: PageInfo;
};

/** A Relay edge containing a `Team` and its cursor. */
export type TeamEdge = {
    __typename?: 'TeamEdge';
    /** A cursor for use in pagination */
    cursor: Scalars['String'];
    /** The item at the end of the edge */
    node?: Maybe<Team>;
};

export type User = Node & {
    __typename?: 'User';
    dateJoined: Scalars['DateTime'];
    email: Scalars['String'];
    firstName: Scalars['String'];
    /** The ID of the object. */
    id: Scalars['ID'];
    /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
    isActive: Scalars['Boolean'];
    /** Designates whether the user can log into this admin site. */
    isStaff: Scalars['Boolean'];
    /** Designates that this user has all permissions without explicitly assigning them. */
    isSuperuser: Scalars['Boolean'];
    lastLogin?: Maybe<Scalars['DateTime']>;
    lastName: Scalars['String'];
    role: MyUserRole;
    teamSet: TeamConnection;
    /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
    username: Scalars['String'];
};


export type UserTeamSetArgs = {
    after?: Maybe<Scalars['String']>;
    before?: Maybe<Scalars['String']>;
    first?: Maybe<Scalars['Int']>;
    last?: Maybe<Scalars['Int']>;
    name?: Maybe<Scalars['String']>;
    offset?: Maybe<Scalars['Int']>;
};

export type UserConnection = {
    __typename?: 'UserConnection';
    /** Contains the nodes in this connection. */
    edges: Array<Maybe<UserEdge>>;
    /** Pagination data for this connection. */
    pageInfo: PageInfo;
};

/** A Relay edge containing a `User` and its cursor. */
export type UserEdge = {
    __typename?: 'UserEdge';
    /** A cursor for use in pagination */
    cursor: Scalars['String'];
    /** The item at the end of the edge */
    node?: Maybe<User>;
};
