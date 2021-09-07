const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
    users: [User]
    user(username: String!): User
    me: User
  }

  type Mutation {
    login(email: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;