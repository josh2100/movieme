import { gql } from "@apollo/client";

export const QUERY_THOUGHTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_THOUGHT = gql`
  query thought($id: ID!) {
    thought(_id: $id) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//     }
//   }
// `;

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      friends {
        username
        _id
      }
      articles {
        _id
        title
        description
        content
        image
        comments{
          _id
          commentText
          username
          createdAt
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friends {
        username
        _id
      }
      articles {
        _id
        title
        content
        description
        image
        url
        comments{
          _id
          commentText
          username
          createdAt
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

// export const QUERY_ME = gql`
//   {
//     me {
//       _id
//       username
//       email
//       friends {
//         _id
//       }
//       articles {
//         _id
//         title
//         content
//         description
//       }
//     }
//   }
// `;
