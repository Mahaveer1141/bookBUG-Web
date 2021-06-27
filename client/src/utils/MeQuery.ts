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
    }
  }
`;
