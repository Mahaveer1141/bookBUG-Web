import { Maybe, Scalars } from "./generated/graphql";

export interface UserType {
  id?: number;
  displayName?: string;
  username?: string;
  bio?: string;
  photoUrl?: string;
}

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

export interface PostType {
  id: number;
}

type Users = {
  __typename?: "Users";
  id?: Scalars["ID"];
  displayName?: Scalars["String"];
  username?: Scalars["String"];
  email?: Scalars["String"];
  photoUrl?: Scalars["String"];
  bio?: Scalars["String"];
};

type Post = {
  __typename?: "Post";
  id: Scalars["ID"];
  text: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  creatorId: Scalars["Float"];
  creator: Users;
  num_likes: Scalars["Float"];
  isLiked: Scalars["Boolean"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export interface ShowPostProps {
  post: Post;
  showCommentIcon: boolean;
}

export interface CommentType {
  id: number;
  creator: UserType;
  comment: string;
  postId: number;
  isMe: boolean;
}

export interface PostIDProps {
  user: UserType;
  post: Post;
  comments: CommentType[];
}
