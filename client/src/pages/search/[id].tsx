import { gql } from "@apollo/client";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
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
  const [onUser, setOnUser] = useState<boolean>(true);

  return (
    <Box>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box mt="2rem" pos="fixed" w="50%" h="89vh" left="30%">
          <Text fontSize="1.4rem" fontWeight="medium" color="grey.500">
            Results for "{router.query.id}"
          </Text>
          <Flex mt="2rem">
            <Text
              _hover={{ cursor: "pointer" }}
              decoration={onUser ? "underline" : null}
              fontSize="1.5rem"
              fontWeight="semibold"
              onClick={() => setOnUser(true)}
            >
              Users ({results.users.length})
            </Text>
            <Text
              decoration={!onUser ? "underline" : null}
              _hover={{ cursor: "pointer" }}
              fontSize="1.5rem"
              fontWeight="semibold"
              ml="2rem"
              onClick={() => setOnUser(false)}
            >
              Books ({results.books.items.length})
            </Text>
          </Flex>
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

  const query = id.toString().split(" ").join("+");

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  const books = await response.json();

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
        books: books,
      },
    },
  };
};

export default SearchResult;
