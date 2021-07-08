import { Maybe, Scalars } from "./generated/graphql";

export type UserType = {
  __typename?: "Users";
  id?: Scalars["ID"];
  displayName?: Scalars["String"];
  username?: Scalars["String"];
  email?: Scalars["String"];
  photoUrl?: Scalars["String"];
  bio?: Scalars["String"];
  isFollowed?: Scalars["Boolean"];
};

export interface NavItemProps {
  icon: any;
  title: String;
  active?: boolean;
  navSize: String;
  to: string;
}

export interface SidebarProps {
  page: String;
}

export interface NavbarProps {
  photoUrl: string;
}

export interface MeProps {
  user: UserType;
}

export type PostType = {
  __typename?: "Post";
  id: Scalars["ID"];
  text: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  creatorId: Scalars["Float"];
  creator: UserType;
  num_likes: Scalars["Float"];
  isLiked: Scalars["Boolean"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export interface ShowPostProps {
  post: PostType;
  showCommentIcon: boolean;
}

export type CommentType = {
  __typename?: "Comments";
  id: Scalars["ID"];
  postId: Scalars["Float"];
  creator: UserType;
  creatorId?: Scalars["Float"];
  comment: Scalars["String"];
  createdAt: Scalars["String"];
  isMe: Scalars["Boolean"];
};
export interface PostIDProps {
  user: UserType;
  post: PostType;
  comments: CommentType[];
}

export interface SearchProps {
  user: UserType;
  results: {
    users: UserType[];
    books: any;
  };
}
