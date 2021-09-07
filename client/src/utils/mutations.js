import gql from 'graphal-tag';

export const LOGIN_USER = gql `
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const CREATE_USER = gql `
mutation createUser($username: String!, $password: String!, $email: String!) {
  User(username: $username, password: $password, email: $email) {
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        bookId
        image
        link
        title
        description
      }
    }
    token
  }
}
`;