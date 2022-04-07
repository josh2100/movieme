const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    articles: [Article]
    friends: [User]
}

type Query {
    me: User
    users: [User]
    user(_id: ID!): User
}

type Article {
    _id: ID
    title: String
    description: String
    url: String
    content: String
    image: String
    comments: [Comment]
}

type Comment {
  _id: ID
  commentText: String
  createdAt: String
  username: String
}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  addFriend(friendsId: ID!): User
  deleteFriend(friendsId: ID!): User
  savedArticle(title: String!, content: String!, description: String!, image: String!, url: String!): Article
  deleteArticle(articleId: ID!): User 
  addComment(articleId: ID!, commentText: String!): Article
  deleteComment(articleId: ID!, commentId: ID!): Article
}

type Auth {
  token: ID!
  user: User
}

`;
module.exports = typeDefs;

// savedArticle(article: savedArticleInput): User

// input savedArticleInput {
//   content:String
//   description: String
//   image: String
//   url: String
//   title: String
// }

// type Mutation {
//   login(email: String!, password: String!): Auth
//   addUser(username: String!, email: String!, password: String!): Auth
//   addFriend(friendsId: ID!): User
//   savedArticle(content: String!, description: String!): Article
//   deleteArticle(articleId: ID!): Article 
//   addComment(articleId: ID!, commentText: String!): Article
// }