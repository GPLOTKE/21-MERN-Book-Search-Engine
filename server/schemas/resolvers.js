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
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No profile with this email found!');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
      
            const token = signToken(user);
            return { token, user };
          },

        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id }, 
                    { $addToSet: { savedBooks: args.input } }, 
                    { new: true });
                
                    return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        deleteBook: async () => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id }, 
                    { $pull: { savedBooks: { bookId: args.bookId } } }, 
                    { new: true });

                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
};

module.exports = resolvers;