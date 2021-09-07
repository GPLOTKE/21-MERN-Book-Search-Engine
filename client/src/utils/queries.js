import gql from 'graphal-tag';

export const GET_ME = gql`
 get me{
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        authors
        image
        link
        title
        description
      }
    }
  }
`;