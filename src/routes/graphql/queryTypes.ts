import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './types/uuid.js';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'enum',
  values: {
    BASIC: {
      description: 'Basic member',
    },
    BUSINESS: {
      description: 'Business member',
    },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {
      type: new GraphQLNonNull(MemberTypeIdEnum),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
    },
  },
});

export const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    profile: {
      type: Profile,
    },
    // posts: {},
    // userSubscribedTo: {},
    // subscribedToUser: {},
  },
});
