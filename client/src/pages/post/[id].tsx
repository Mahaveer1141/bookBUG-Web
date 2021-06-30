import { gql } from "@apollo/client";
import { Box, Flex, Button, Text, Textarea } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import ShowPost from "../../components/ShowPost";
import { PostIDProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const App: React.FC<PostIDProps> = ({ user, post, comments }) => {
  const router = useRouter();
  console.log(post);
  console.log(comments);

  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box mt="2rem" pos="fixed" w="50%" h="89vh" left="30%">
          <Box pos="sticky" overflowY="auto" pb="10rem" h="100%">
            <ShowPost showCommentIcon={false} post={post} />
            <Text>Comments</Text>
            <Textarea />
            <Button>Post</Button>
          </Box>
        </Box>
      </Flex>
    </>
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
          }
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
