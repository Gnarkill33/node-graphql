import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType } from './queryTypes.js';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: async (_, __, contextValue) => {
        const { prisma } = contextValue;
        return prisma.memberType.findMany();
      },
    },
  }),
});
