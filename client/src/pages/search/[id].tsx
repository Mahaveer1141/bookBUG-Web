import { gql } from "@apollo/client";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import ShowBasicUser from "../../components/ShowBasicUser";
import { useMakeFollowMutation } from "../../generated/graphql";
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
  const router = useRouter();

  return (
    <Box>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box>
          <Text>Results</Text>
          {results.users.map((item, key) => (
            <div key={key}>
              <ShowBasicUser user={item} />
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
      query getSearchUsers {
        getSearchUsers(detail: "${id}") {
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
        users: val.data?.getSearchUsers,
        books: id,
      },
    },
  };
};

export default SearchResult;
