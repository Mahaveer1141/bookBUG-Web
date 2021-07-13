import { gql } from "@apollo/client";
import { Flex, Image, Text, Box, Button, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ShowLibrary from "../../components/ShowLibrary";
import { useMakeFollowMutation } from "../../generated/graphql";
import { ShowUserProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const ShowUser: React.FC<ShowUserProps> = ({ user, curUser, books }) => {
  const [makeFollow] = useMakeFollowMutation();
  const [isFollowed, setFollowed] = useState<boolean>(curUser.isFollowed);

  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex>
        <Sidebar page="Home" />
        <Box
          mt="2rem"
          pos="fixed"
          w="50%"
          h="89vh"
          left="30%"
          overflowY="auto"
          pb="10rem"
        >
          <Flex>
            <Image
              src={curUser.photoUrl}
              w="120px"
              h="120px"
              borderRadius="100%"
            />
            <Stack ml="1rem">
              <Text fontWeight="semibold">{curUser.displayName}</Text>
              <Text>{curUser.username}</Text>
              <Button
                variant={isFollowed ? "outline" : "solid"}
                size="xs"
                colorScheme="blue"
                onClick={() => {
                  setFollowed(!isFollowed);
                  makeFollow({
                    variables: { followingId: Number(curUser.id) },
                  });
                }}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
              <Button size="xs">Message</Button>
            </Stack>
          </Flex>
          <Box mt="2rem">
            <Text fontSize="1.2rem" fontWeight="semibold">
              About
            </Text>
            <Flex mt="1rem" justifyContent="space-between">
              <Text>
                <Text as="span" fontWeight="semibold" fontSize="1.2rem">
                  {curUser.num_follower - 1}
                </Text>{" "}
                Followers
              </Text>
              <Text>
                <Text as="span" fontWeight="semibold" fontSize="1.2rem">
                  {curUser.num_following - 1}
                </Text>{" "}
                Followings
              </Text>
              <Text>
                <Text as="span" fontWeight="semibold" fontSize="1.2rem">
                  {curUser.num_post}
                </Text>{" "}
                Posts
              </Text>
            </Flex>
            <Text mt="1rem" fontSize="1.1rem" fontWeight="semibold">
              Bio
            </Text>
            <Text>
              {curUser.bio.trim() === "" ? "Bio not available" : curUser.bio}
            </Text>
          </Box>
          <Box mt="2rem">
            <Flex>
              <Text fontSize="1rem" fontWeight="semibold">
                Collection({books.length})
              </Text>
              <ShowLibrary books={books} />
            </Flex>
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

  const curUser = await apolloClient.query({
    query: gql`
      query GetOneUser {
        getOneUser(id: ${id}) {
             id
            displayName
            username
            photoUrl
            bio
            num_following
            num_follower
            num_post
            isFollowed
        }
      }
    `,
  });

  const allBooksId = await apolloClient.query({
    query: gql`
      query GetBooksId {
        getBooksId(id: ${id})
      }
    `,
  });

  const books: any = [];

  for (let i = 0; i < allBooksId.data.getBooksId.length; i++) {
    const id = allBooksId.data.getBooksId[i];
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
    const book = await response.json();
    books.push(book);
  }

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
      curUser: curUser?.data?.getOneUser,
      books: books,
    },
  };
};

export default ShowUser;
