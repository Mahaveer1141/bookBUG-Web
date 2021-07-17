import { gql } from "@apollo/client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import ShowBasicUser from "../../components/ShowBasicUser";
import { SearchProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const SearchResult: React.FC<SearchProps> = ({ user, results }) => {
  return (
    <Box>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
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
          <Text fontSize="1.4rem" fontWeight="medium" color="grey.500">
            Followers
          </Text>
          {results.users.map((item, key) => (
            <div key={key}>
              <ShowBasicUser me={user} user={item} />
            </div>
          ))}
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

  const val = await apolloClient.query({
    query: gql`
      query GetFollowers {
        getFollowers(userId: ${Number(id)}) {
          id
          username
          displayName
          photoUrl
          isFollowed
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
      results: {
        users: val.data?.getFollowers,
      },
    },
  };
};

export default SearchResult;
