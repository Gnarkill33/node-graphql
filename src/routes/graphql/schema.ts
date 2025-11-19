import { GraphQLSchema } from 'graphql';
import { RootQueryType } from './rootQuery.js';

export const schema = new GraphQLSchema({ query: RootQueryType });
