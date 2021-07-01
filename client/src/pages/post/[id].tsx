import { gql } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  Text,
  Textarea,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ShowPost from "../../components/ShowPost";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../../generated/graphql";
import { CommentType, PostIDProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";
import { timeDifference } from "../../utils/timeDifference";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const App: React.FC<PostIDProps> = ({ user, post, comments }) => {
  const router = useRouter();
  const [commentState, setCommentState] = useState(comments);
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  return (
    <Box>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box mt="2rem" pos="fixed" w="50%" h="89vh" left="30%">
          <Box pos="sticky" overflowY="auto" pb="10rem" h="100%">
            <ShowPost showCommentIcon={false} post={post} />
            <Text>Comments</Text>
            <Formik
              initialValues={{
                message: "",
              }}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                const { data } = await createComment({
                  variables: {
                    postId: Number(post.id),
                    comment: values.message,
                  },
                });
                const addedComment: CommentType = {
                  id: data.createComment.id,
                  comment: values.message,
                  isMe: true,
                  creator: user,
                  postId: Number(post.id),
                  createdAt: data.createComment.createdAt,
                };
                const newArray = [addedComment, ...commentState];
                setCommentState(newArray);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
            >
              {({ values, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Textarea
                    required
                    placeholder="Add Comment"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                  />
                  <Button
                    disabled={values.message.trim() === ""}
                    isLoading={isSubmitting}
                    mt="1rem"
                    size="sm"
                    colorScheme="green"
                    type="submit"
                  >
                    Post
                  </Button>
                </form>
              )}
            </Formik>
            {commentState.map((comment, key) => (
              <Box key={key} mt="1rem">
                <Flex alignItems="center">
                  <Image
                    src={comment.creator.photoUrl}
                    h="25px"
                    w="25px"
                    borderRadius="100px"
                  />
                  <Text fontSize="0.9rem" fontWeight="medium" ml={3}>
                    {comment.creator.displayName}
                  </Text>
                  <Text fontSize="0.6rem" ml="auto">
                    {timeDifference(new Date(), comment.createdAt)}
                  </Text>
                  <IconButton
                    onClick={() => {
                      const newArray = commentState.filter(
                        (c) => c.id !== comment.id
                      );
                      setCommentState(newArray);
                      deleteComment({ variables: { id: Number(comment.id) } });
                    }}
                    hidden={!comment.isMe}
                    aria-label=""
                    icon={<DeleteIcon />}
                  />
                </Flex>
                <Text>{comment.comment}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = createClient(ctx as any);

  const id = ctx.query.id;

  const { data } = await apolloClient.query({
    query: MeQuery,
  });

  const allData = await apolloClient.query({
    query: gql`
      query GetOnePost {
        getOnePost(postId: ${id}) {
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
            displayName
          }
          num_likes
          isLiked
        }
      }
    `,
  });

  const allCommentsData = await apolloClient.query({
    query: gql`
      query {
        getComments(postId: ${id}) {
          id
          creator {
            id
            displayName
            photoUrl
          }
          createdAt
          comment
          postId
          isMe
        }
      }
    `,
  });

  if (data?.Me === null) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: data?.Me,
      post: allData.data.getOnePost,
      comments: allCommentsData.data.getComments,
    },
  };
};

export default App;
