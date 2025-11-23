import {
  GraphQLList,
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './types/uuid.js';
import { GraphQLContext } from './rootQuery.js';
import {
  Profile as PrismaProfile,
  MemberType as PrismaMemberType,
  Post as PrismaPost,
  User as PrismaUser,
} from '@prisma/client';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
      description: 'Basic member',
    },
    BUSINESS: {
      value: 'BUSINESS',
      description: 'Business member',
    },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(MemberTypeIdEnum),
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (source: PrismaMemberType, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return await prisma.profile.findMany({
          where: { memberTypeId: source.id },
        });
      },
    },
  }),
});

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
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
      resolve: async (source: PrismaProfile, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return await prisma.memberType.findUnique({
          where: { id: source.memberTypeId },
        });
      },
    },
    user: {
      type: new GraphQLNonNull(User),
      resolve: async (source: PrismaProfile, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return await prisma.user.findUnique({
          where: { id: source.userId },
        });
      },
    },
  }),
});

export const Post = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(User),
      resolve: async (source: PrismaPost, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return await prisma.user.findUnique({
          where: { id: source.authorId },
        });
      },
    },
  }),
});

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
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
      type: new GraphQLNonNull(Profile),
      resolve: async (source: PrismaUser, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return await prisma.profile.findUnique({
          where: { userId: source.id },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (source: PrismaUser, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return await prisma.post.findMany({
          where: { authorId: source.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (source: PrismaUser, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: source.id },
          include: { author: true },
        });
        return subscriptions.map((sub) => sub.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (source: PrismaUser, _, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: source.id },
          include: { subscriber: true },
        });
        return subscribers.map((sub) => sub.subscriber);
      },
    },
  }),
});
