import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType } from './queryTypes.js';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  prisma: PrismaClient;
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
  }),
});
