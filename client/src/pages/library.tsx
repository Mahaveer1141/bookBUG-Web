import { gql } from "@apollo/client";
import { Flex, Box, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import ShowLibrary from "../components/ShowLibrary";
import { LibraryProps } from "../types";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";
const Navbar = dynamic(import("../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const Library: React.FC<LibraryProps> = ({ user, books }) => {
  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="My Library" />
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
            <Text fontSize="1.4rem" fontWeight="medium" color="grey.500">
              My Library({books.length})
            </Text>
          </Flex>
          <ShowLibrary books={books} />
        </Box>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = createClient(ctx as any);

  const { data } = await apolloClient.query({
    query: MeQuery,
  });

  const allBooksId = await apolloClient.query({
    query: gql`
      query GetBooksId {
        getBooksId(id: ${data?.Me.id})
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
      books: books,
    },
  };
};

export default Library;
