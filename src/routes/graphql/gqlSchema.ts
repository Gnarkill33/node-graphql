import { PrismaClient } from '@prisma/client';
import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

const memberIdEnum = new GraphQLEnumType({
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

const memberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: {
      type: new GraphQLNonNull(memberIdEnum),
      description: 'The id of the member',
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'The discount of the member',
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of posts per month',
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(memberType))),
      resolve: async (_, __, contextValue) => {
        const { prisma } = contextValue;
        return prisma.memberType.findMany();
      },
    },
  }),
});

export const schema = new GraphQLSchema({ query: queryType });
