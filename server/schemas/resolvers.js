const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return Profile.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },

    Mutation: {
        createUser: async () => {

        },

        login: async () => {

        },

        saveBook: async () => {

        },

        deleteBook: async () => {

        }
    },
};

module.exports = resolvers;