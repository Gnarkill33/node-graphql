import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from './rootQuery.js';
import { Post, Profile, User } from './queryTypes.js';
import {
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
} from './mutationInputs.js';

interface CreateUserArgs {
  dto: {
    name: string;
    balance: number;
  };
}

interface CreateProfileArgs {
  dto: {
    isMale: boolean;
    yearOfBirth: number;
    userId: string;
    memberTypeId: 'BASIC' | 'BUSINESS';
  };
}

interface CreatePostArgs {
  dto: {
    title: string;
    content: string;
    authorId: string;
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
    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: {
          type: new GraphQLNonNull(CreateProfileInput),
        },
      },
      resolve: async (_, { dto }: CreateProfileArgs, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        const newProfile = prisma.profile.create({
          data: {
            isMale: dto.isMale,
            yearOfBirth: dto.yearOfBirth,
            userId: dto.userId,
            memberTypeId: dto.memberTypeId,
          },
        });

        return newProfile;
      },
    },
    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: {
          type: new GraphQLNonNull(CreatePostInput),
        },
      },
      resolve: async (_, { dto }: CreatePostArgs, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        const newPost = prisma.post.create({
          data: {
            title: dto.title,
            content: dto.content,
            authorId: dto.authorId,
          },
        });

        return newPost;
      },
    },
  }),
});
