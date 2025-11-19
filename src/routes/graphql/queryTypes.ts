import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

const MemberTypeIdEnum = new GraphQLEnumType({
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
