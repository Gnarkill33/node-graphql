import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
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
        const newUser = await prisma.user.create({
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
        const newProfile = await prisma.profile.create({
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
        const newPost = await prisma.post.create({
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
        const changedPost = await prisma.post.update({
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
        const changedProfile = await prisma.profile.update({
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
        const changedUser = await prisma.user.update({
          data: {
            name: dto.name,
            balance: dto.balance,
          },
          where: { id },
        });

        return changedUser;
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        await prisma.user.delete({ where: { id } });
        return 'User deleted';
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        await prisma.post.delete({ where: { id } });
        return 'Post deleted';
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (_, { id }: { id: string }, contextValue: GraphQLContext) => {
        const { prisma } = contextValue;
        await prisma.profile.delete({ where: { id } });
        return 'Profile deleted';
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        contextValue: GraphQLContext,
      ) => {
        const { prisma } = contextValue;
        await prisma.subscribersOnAuthors.create({
          data: { subscriberId: userId, authorId },
        });
        return 'User subscribed to author';
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: {
          type: new GraphQLNonNull(UUIDType),
        },
        authorId: {
          type: new GraphQLNonNull(UUIDType),
        },
      },
      resolve: async (
        _,
        { userId, authorId }: { userId: string; authorId: string },
        contextValue: GraphQLContext,
      ) => {
        const { prisma } = contextValue;
        await prisma.subscribersOnAuthors.delete({
          where: { subscriberId_authorId: { subscriberId: userId, authorId } },
        });
        return 'User unsubscribed from author';
      },
    },
  }),
});
