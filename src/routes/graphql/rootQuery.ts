import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdEnum, User } from './queryTypes.js';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  prisma: PrismaClient;
}

interface Args {
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
          type: MemberTypeIdEnum,
        },
      },
      resolve: async (_, { id }: Args, contextValue: GraphQLContext) => {
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
  }),
});
