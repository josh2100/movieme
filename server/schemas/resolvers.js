const User = require("../models/User");
const Article = require("../models/Article");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        ).populate("articles").populate("friends")

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    users: async () => {
      return User.find().select("-__v -password");
    },

    // finding a single user by Id
    user: async (parent, { _id }) => {
      return User.findOne({ _id }).populate("articles").populate("friends");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    savedArticle: async (parent, args, context) => {
      if (context.user) {
        const article = await Article.create({
          ...args,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { articles: article._id } },
          { new: true }
        ).populate("comments");

        return article;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    deleteArticle: async (parent, { articleId }, context) => {
      if (context.user) {
       const deletedArticle = await  Article.findByIdAndDelete(articleId )
          if(!deletedArticle){
            throw new Error("No Article here")
          }

        const removeArticle = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { articles: articleId } },
          { new: true }
        );
        return removeArticle;
      }
      throw new AuthenticationError(
        "You need to be logged to delete articles!"
      );
    },

    addFriend: async (parent, { friendsId }, context) => {
      if (context.user) {
        const addBro = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendsId } },
          { new: true }
        ).populate("friends");

        return addBro;
      }
      throw new AuthenticationError("You need to be logged to add a friend!");
    },

    deleteFriend: async (parent, { friendsId }, context) => {
      if (context.user) {
        const deleteBro = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendsId } },
          { new: true }
        ).populate("friends");

        return deleteBro;
      }
      throw new AuthenticationError("You need to be logged to delete a friend!");
    },

    addComment: async (parent, { articleId, commentText }, context) => {
      if (context.user) {
        const plusComment = await Article.findOneAndUpdate(
          { _id: articleId },
          {
            $push: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );

        return plusComment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteComment: async (parent, { articleId, commentId }, context) => {
      if (context.user) {
        const minusComment = await Article.findByIdAndUpdate(
          { _id: articleId },
          { $pull: { comments: { _id: commentId } } },
          { new: true }
        );

        return minusComment;
      }
      throw new AuthenticationError("You need to be logged to delete a friend!");
    }
  },
};

module.exports = resolvers;