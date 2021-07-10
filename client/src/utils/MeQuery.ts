import { gql } from "@apollo/client";

export const MeQuery = gql`
  query Me {
    Me {
      id
      email
      displayName
      username
      photoUrl
      bio
      num_following
      num_follower
      num_post
    }
  }
`;
