import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdEnum, Post, Profile, User } from './queryTypes.js';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

export interface GraphQLContext {
  prisma: PrismaClient;
}

interface MemberTypeArgs {
  id: 'BUSINESS' | 'BASIC';
}

export const RootQueryType = new GraphQLObjectType<GraphQLContext>({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, __, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.memberType.findMany();
      },
    },
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: new GraphQLNonNull(MemberTypeIdEnum),
        },
      },
      resolve: async (_, { id }: MemberTypeArgs, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.memberType.findUnique({
          where: { id },
        });
      },
    },
    users: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
      resolve: async (_, __, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.user.findMany();
      },
    },
    user: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      type: User,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.user.findUnique({
          where: { id },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Post))),
      resolve: async (_, __, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.post.findMany();
      },
    },
    post: {
      type: Post,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.post.findUnique({
          where: { id },
        });
      },
    },
    profiles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Profile))),
      resolve: async (_, __, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.profile.findMany();
      },
    },
    profile: {
      type: Profile,
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        return prisma.profile.findUnique({
          where: { id },
        });
      },
    },
  }),
});
