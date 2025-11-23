import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './rootQuery.js';
import { Mutations } from './rootMutation.js';

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});
