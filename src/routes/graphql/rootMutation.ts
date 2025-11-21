import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { GraphQLContext } from './rootQuery.js';
import { Post, Profile, User } from './queryTypes.js';
import {
  ChangePostInput,
  ChangeProfileInput,
  ChangeUserInput,
  CreatePostInput,
  CreateProfileInput,
  CreateUserInput,
} from './mutationInputs.js';
import { UUIDType } from './types/uuid.js';

interface CreateUserArgs {
  name: string;
  balance: number;
}

interface CreateProfileArgs {
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: 'BASIC' | 'BUSINESS';
}

interface CreatePostArgs {
  title: string;
  content: string;
  authorId: string;
}

interface ChangePostArgs {
  title: string;
  content: string;
}

interface ChangeProfileArgs {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: 'BASIC' | 'BUSINESS';
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
      resolve: async (_, dto: CreateUserArgs, contextValue: GraphQLContext) => {
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
      resolve: async (_, dto: CreateProfileArgs, contextValue: GraphQLContext) => {
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
      resolve: async (_, dto: CreatePostArgs, contextValue: GraphQLContext) => {
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
    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangePostInput),
        },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: ChangePostArgs },
        contextValue: GraphQLContext,
      ) => {
        const { prisma } = contextValue;
        const changedPost = prisma.post.update({
          data: {
            title: dto.title,
            content: dto.content,
          },
          where: { id },
        });

        return changedPost;
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangeProfileInput),
        },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: ChangeProfileArgs },
        contextValue: GraphQLContext,
      ) => {
        const { prisma } = contextValue;
        const changedProfile = prisma.profile.update({
          data: {
            isMale: dto.isMale,
            yearOfBirth: dto.yearOfBirth,
            memberTypeId: dto.memberTypeId,
          },
          where: { id },
        });

        return changedProfile;
      },
    },
    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
        dto: {
          type: new GraphQLNonNull(ChangeUserInput),
        },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: CreateUserArgs },
        contextValue: GraphQLContext,
      ) => {
        const { prisma } = contextValue;
        const changedUser = prisma.user.update({
          data: {
            name: dto.name,
            balance: dto.balance,
          },
          where: { id },
        });

        return changedUser;
      },
    },
  }),
});
