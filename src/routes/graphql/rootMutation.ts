import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from './rootQuery.js';
import { User } from './queryTypes.js';
import { CreateUserInput } from './mutationInputs.js';

interface CreateUserArgs {
  dto: {
    name: string;
    balance: number;
  };
}

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(User),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateUserInput),
        },
      },
      resolve: async (_, { dto }: CreateUserArgs, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        const newUser = prisma.user.create({
          data: {
            name: dto.name,
            balance: dto.balance,
          },
        });

        return newUser;
      },
    },
  }),
});
