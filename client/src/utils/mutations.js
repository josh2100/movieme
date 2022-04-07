import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
mutation addFriend($friendsId: ID!) {
  addFriend(friendsId: $friendsId) {
    _id
    username
  }
}`

export const DELETE_FRIEND = gql`
mutation deleteFriend($friendsId: ID!) {
  deleteFriend(friendsId: $friendsId) {
    _id
  }
}`

export const SAVE_ARTICLE = gql`
mutation savedArticle($title: String!, $content: String!, $description: String!, $image: String!, $url: String!){
  savedArticle (title: $title, content: $content, description: $description, image: $image, url: $url){
      title
      content
      description
      image
      url
  }
}
`;

export const DELETE_ARTICLE = gql`
mutation deleteArticle($articleId: ID!){
  deleteArticle(articleId: $articleId) {
    articles {
    _id
    }
  }
}
`

export const ADD_COMMENT = gql`
mutation addComment($articleId: ID!, $commentText: String!) {
  addComment(articleId: $articleId, commentText: $commentText) {
    _id
    title 
    comments {
      _id
      commentText
      username
    }
  }
}
`
export const DELETE_COMMENT = gql`
mutation deleteComment($articleId: ID!, $commentId: ID!) {
  deleteComment(articleId: $articleId, commentId: $commentId) {
    _id
    title 
    comments {
      _id
    }
  }
}
`