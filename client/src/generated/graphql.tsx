import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comments = {
  __typename?: 'Comments';
  id: Scalars['ID'];
  postId: Scalars['Float'];
  creator: Users;
  creatorId: Scalars['Float'];
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  isMe: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Tokens>;
  UpdateUser?: Maybe<UserResponse>;
  Logout: Scalars['Boolean'];
  addBook: Scalars['String'];
  updatePost: Scalars['Boolean'];
  deletePost: Scalars['String'];
  createPost: Post;
  changeLike: Scalars['String'];
  createComment: Comments;
  deleteComment: Scalars['String'];
  makeFollow: Scalars['String'];
};


export type MutationLoginArgs = {
  imageUrl: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  bio: Scalars['String'];
  displayName: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String'];
};


export type MutationAddBookArgs = {
  bookId: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  imageUrl: Scalars['String'];
  text: Scalars['String'];
  postId: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  imageUrl: Scalars['String'];
  text: Scalars['String'];
};


export type MutationChangeLikeArgs = {
  postId: Scalars['Float'];
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  postId: Scalars['Float'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};


export type MutationMakeFollowArgs = {
  followerId: Scalars['Float'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  text: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  creatorId: Scalars['Float'];
  creator: Users;
  comments: Array<Comments>;
  num_likes: Scalars['Float'];
  isLiked: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  Me?: Maybe<Users>;
  getSearchUsers?: Maybe<Array<Users>>;
  getOneUser: Users;
  getBooksId?: Maybe<Array<Scalars['String']>>;
  getAllPost: Array<Post>;
  getOnePost: Post;
  getUsersPost: Array<Post>;
  getComments: Array<Comments>;
  getFollowers: Array<Users>;
  getFollowings: Array<Users>;
};


export type QueryGetSearchUsersArgs = {
  detail: Scalars['String'];
};


export type QueryGetOneUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetBooksIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetOnePostArgs = {
  postId: Scalars['Float'];
};


export type QueryGetUsersPostArgs = {
  userId: Scalars['Float'];
};


export type QueryGetCommentsArgs = {
  postId: Scalars['Float'];
};


export type QueryGetFollowersArgs = {
  userId: Scalars['Float'];
};


export type QueryGetFollowingsArgs = {
  userId: Scalars['Float'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Scalars['String']>>;
  user?: Maybe<Users>;
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['ID'];
  displayName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  photoUrl: Scalars['String'];
  bio: Scalars['String'];
  isFollowed: Scalars['Boolean'];
  num_follower: Scalars['Float'];
  num_following: Scalars['Float'];
  num_post: Scalars['Float'];
};

export type AddBookMutationVariables = Exact<{
  bookId: Scalars['String'];
}>;


export type AddBookMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addBook'>
);

export type ChangeLikeMutationVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type ChangeLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeLike'>
);

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Float'];
  comment: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comments' }
    & Pick<Comments, 'id' | 'postId' | 'creatorId' | 'comment' | 'createdAt'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  text: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'imageUrl' | 'createdAt' | 'updatedAt' | 'creatorId'>
  ) }
);

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteComment'>
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'Tokens' }
    & Pick<Tokens, 'accessToken' | 'refreshToken'>
  )> }
);

export type LogoutMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'Logout'>
);

export type MakeFollowMutationVariables = Exact<{
  followingId: Scalars['Float'];
}>;


export type MakeFollowMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'makeFollow'>
);

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['Float'];
  text: Scalars['String'];
  imageUrl: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updatePost'>
);

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
  displayName: Scalars['String'];
  bio: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { UpdateUser?: Maybe<(
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'errors'>
    & { user?: Maybe<(
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'username' | 'displayName' | 'bio'>
    )> }
  )> }
);

export type GetAllPostQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostQuery = (
  { __typename?: 'Query' }
  & { getAllPost: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'imageUrl' | 'createdAt' | 'updatedAt' | 'creatorId' | 'num_likes' | 'isLiked' | 'isMe'>
    & { creator: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'username' | 'displayName' | 'photoUrl'>
    ) }
  )> }
);

export type GetOnePostQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type GetOnePostQuery = (
  { __typename?: 'Query' }
  & { getOnePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'imageUrl' | 'createdAt' | 'updatedAt' | 'creatorId' | 'num_likes' | 'isLiked'>
    & { creator: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'username' | 'photoUrl'>
    ) }
  ) }
);

export type GetUsersPostQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type GetUsersPostQuery = (
  { __typename?: 'Query' }
  & { getUsersPost: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'text' | 'imageUrl' | 'createdAt' | 'updatedAt' | 'creatorId' | 'num_likes' | 'isLiked'>
    & { creator: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'username' | 'photoUrl'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { Me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'email' | 'displayName' | 'username' | 'photoUrl'>
  )> }
);


export const AddBookDocument = gql`
    mutation AddBook($bookId: String!) {
  addBook(bookId: $bookId)
}
    `;
export type AddBookMutationFn = Apollo.MutationFunction<AddBookMutation, AddBookMutationVariables>;

/**
 * __useAddBookMutation__
 *
 * To run a mutation, you first call `useAddBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookMutation, { data, loading, error }] = useAddBookMutation({
 *   variables: {
 *      bookId: // value for 'bookId'
 *   },
 * });
 */
export function useAddBookMutation(baseOptions?: Apollo.MutationHookOptions<AddBookMutation, AddBookMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBookMutation, AddBookMutationVariables>(AddBookDocument, options);
      }
export type AddBookMutationHookResult = ReturnType<typeof useAddBookMutation>;
export type AddBookMutationResult = Apollo.MutationResult<AddBookMutation>;
export type AddBookMutationOptions = Apollo.BaseMutationOptions<AddBookMutation, AddBookMutationVariables>;
export const ChangeLikeDocument = gql`
    mutation ChangeLike($postId: Float!) {
  changeLike(postId: $postId)
}
    `;
export type ChangeLikeMutationFn = Apollo.MutationFunction<ChangeLikeMutation, ChangeLikeMutationVariables>;

/**
 * __useChangeLikeMutation__
 *
 * To run a mutation, you first call `useChangeLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeLikeMutation, { data, loading, error }] = useChangeLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useChangeLikeMutation(baseOptions?: Apollo.MutationHookOptions<ChangeLikeMutation, ChangeLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeLikeMutation, ChangeLikeMutationVariables>(ChangeLikeDocument, options);
      }
export type ChangeLikeMutationHookResult = ReturnType<typeof useChangeLikeMutation>;
export type ChangeLikeMutationResult = Apollo.MutationResult<ChangeLikeMutation>;
export type ChangeLikeMutationOptions = Apollo.BaseMutationOptions<ChangeLikeMutation, ChangeLikeMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($postId: Float!, $comment: String!) {
  createComment(postId: $postId, comment: $comment) {
    id
    postId
    creatorId
    comment
    createdAt
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($text: String!, $imageUrl: String!) {
  createPost(text: $text, imageUrl: $imageUrl) {
    id
    text
    imageUrl
    createdAt
    updatedAt
    creatorId
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      text: // value for 'text'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Float!) {
  deleteComment(id: $id)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: Float!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($name: String!, $email: String!, $imageUrl: String!) {
  login(name: $name, email: $email, imageUrl: $imageUrl) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout($refreshToken: String!) {
  Logout(refreshToken: $refreshToken)
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MakeFollowDocument = gql`
    mutation MakeFollow($followingId: Float!) {
  makeFollow(followerId: $followingId)
}
    `;
export type MakeFollowMutationFn = Apollo.MutationFunction<MakeFollowMutation, MakeFollowMutationVariables>;

/**
 * __useMakeFollowMutation__
 *
 * To run a mutation, you first call `useMakeFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeFollowMutation, { data, loading, error }] = useMakeFollowMutation({
 *   variables: {
 *      followingId: // value for 'followingId'
 *   },
 * });
 */
export function useMakeFollowMutation(baseOptions?: Apollo.MutationHookOptions<MakeFollowMutation, MakeFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeFollowMutation, MakeFollowMutationVariables>(MakeFollowDocument, options);
      }
export type MakeFollowMutationHookResult = ReturnType<typeof useMakeFollowMutation>;
export type MakeFollowMutationResult = Apollo.MutationResult<MakeFollowMutation>;
export type MakeFollowMutationOptions = Apollo.BaseMutationOptions<MakeFollowMutation, MakeFollowMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($postId: Float!, $text: String!, $imageUrl: String!) {
  updatePost(postId: $postId, text: $text, imageUrl: $imageUrl)
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      text: // value for 'text'
 *      imageUrl: // value for 'imageUrl'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($username: String!, $displayName: String!, $bio: String!) {
  UpdateUser(username: $username, displayName: $displayName, bio: $bio) {
    errors
    user {
      id
      username
      displayName
      bio
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      displayName: // value for 'displayName'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAllPostDocument = gql`
    query GetAllPost {
  getAllPost {
    id
    text
    imageUrl
    createdAt
    updatedAt
    creatorId
    creator {
      id
      username
      displayName
      photoUrl
    }
    num_likes
    isLiked
    isMe
  }
}
    `;

/**
 * __useGetAllPostQuery__
 *
 * To run a query within a React component, call `useGetAllPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPostQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostQuery, GetAllPostQueryVariables>(GetAllPostDocument, options);
      }
export function useGetAllPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostQuery, GetAllPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostQuery, GetAllPostQueryVariables>(GetAllPostDocument, options);
        }
export type GetAllPostQueryHookResult = ReturnType<typeof useGetAllPostQuery>;
export type GetAllPostLazyQueryHookResult = ReturnType<typeof useGetAllPostLazyQuery>;
export type GetAllPostQueryResult = Apollo.QueryResult<GetAllPostQuery, GetAllPostQueryVariables>;
export const GetOnePostDocument = gql`
    query GetOnePost($postId: Float!) {
  getOnePost(postId: $postId) {
    id
    text
    imageUrl
    createdAt
    updatedAt
    creatorId
    creator {
      id
      username
      photoUrl
    }
    num_likes
    isLiked
  }
}
    `;

/**
 * __useGetOnePostQuery__
 *
 * To run a query within a React component, call `useGetOnePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetOnePostQuery(baseOptions: Apollo.QueryHookOptions<GetOnePostQuery, GetOnePostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnePostQuery, GetOnePostQueryVariables>(GetOnePostDocument, options);
      }
export function useGetOnePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnePostQuery, GetOnePostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnePostQuery, GetOnePostQueryVariables>(GetOnePostDocument, options);
        }
export type GetOnePostQueryHookResult = ReturnType<typeof useGetOnePostQuery>;
export type GetOnePostLazyQueryHookResult = ReturnType<typeof useGetOnePostLazyQuery>;
export type GetOnePostQueryResult = Apollo.QueryResult<GetOnePostQuery, GetOnePostQueryVariables>;
export const GetUsersPostDocument = gql`
    query GetUsersPost($userId: Float!) {
  getUsersPost(userId: $userId) {
    id
    text
    imageUrl
    createdAt
    updatedAt
    creatorId
    creator {
      id
      username
      photoUrl
    }
    num_likes
    isLiked
  }
}
    `;

/**
 * __useGetUsersPostQuery__
 *
 * To run a query within a React component, call `useGetUsersPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersPostQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUsersPostQuery(baseOptions: Apollo.QueryHookOptions<GetUsersPostQuery, GetUsersPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersPostQuery, GetUsersPostQueryVariables>(GetUsersPostDocument, options);
      }
export function useGetUsersPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersPostQuery, GetUsersPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersPostQuery, GetUsersPostQueryVariables>(GetUsersPostDocument, options);
        }
export type GetUsersPostQueryHookResult = ReturnType<typeof useGetUsersPostQuery>;
export type GetUsersPostLazyQueryHookResult = ReturnType<typeof useGetUsersPostLazyQuery>;
export type GetUsersPostQueryResult = Apollo.QueryResult<GetUsersPostQuery, GetUsersPostQueryVariables>;
export const MeDocument = gql`
    query Me {
  Me {
    id
    email
    displayName
    username
    photoUrl
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;