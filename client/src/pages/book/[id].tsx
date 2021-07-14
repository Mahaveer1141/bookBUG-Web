import { gql } from "@apollo/client";
import { Flex, Box, Image, Text, Stack, Button, Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import { useAddBookMutation } from "../../generated/graphql";
import { ShowBookProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const ShowBook: React.FC<ShowBookProps> = ({ user, book, alreadyAdded }) => {
  const [isAdded, setAdded] = useState<boolean>(alreadyAdded);
  const [addBook] = useAddBookMutation();

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
              src={book.volumeInfo?.imageLinks?.smallThumbnail}
              w="120px"
              h="120px"
            />
            <Stack ml="1rem">
              <Text fontWeight="semibold">{book.volumeInfo?.title}</Text>
              <Stack direction="column" maxW="80px">
                <Button
                  variant={isAdded ? "outline" : "solid"}
                  size="xs"
                  colorScheme="blue"
                  onClick={() => {
                    setAdded(!isAdded);
                    addBook({
                      variables: { bookId: String(book.id) },
                    });
                  }}
                >
                  {isAdded ? "Remove" : "Add"}
                </Button>
                {/* <Button size="xs">Discussion</Button> */}
              </Stack>
            </Stack>
          </Flex>
          <Box mt="2rem">
            <Text fontSize="1.2rem" fontWeight="semibold">
              About
            </Text>
            <Flex mt="1rem" justifyContent="space-between">
              <Stack>
                <Text fontSize="1.1rem" fontWeight="semibold">
                  Authors :-
                </Text>
                {book.volumeInfo?.authors?.map((name, key) => (
                  <Text
                    fontSize="1.1rem"
                    fontWeight="medium"
                    mt="1rem"
                    pl="1rem"
                    key={key}
                  >
                    {name}
                  </Text>
                ))}
              </Stack>
            </Flex>
            <Flex mt="1rem">
              <Text fontSize="1.1rem" fontWeight="semibold" mr="1rem">
                Rating:-
              </Text>
              <Text>
                {book.volumeInfo?.averageRating
                  ? book.volumeInfo?.averageRating + "⭐"
                  : "NA"}
              </Text>
            </Flex>
            <Flex mt="1rem">
              <Text fontSize="1.1rem" fontWeight="semibold">
                Buy:-
              </Text>
              <Link href={book.volumeInfo?.infoLink}>
                <Text ml="1rem" textColor="blue.300">
                  Google Books
                </Text>
              </Link>
            </Flex>
            <Text mt="1rem" fontSize="1.1rem" fontWeight="semibold">
              Description
            </Text>
            <Text>{book.volumeInfo?.description}</Text>
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

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  const book = await response.json();

  const allBooksId = await apolloClient.query({
    query: gql`
      query GetBooksId {
        getBooksId(id: ${data?.Me.id})
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
      book: book,
      alreadyAdded: allBooksId.data.getBooksId.includes(book.id),
    },
  };
};

export default ShowBook;

/* 
  item[index].id
  item[index].volumeInfo.title - 
  item[index].volumeInfo.authors.forEach -
  item[index].volumeInfo.publisher
  item[index].volumeInfo.description -
  item[index].volumeInfo.pageCount
  item[index].volumeInfo.categories.forEach
  item[index].volumeInfo.averageRating
  item[index].volumeInfo.imageLinks.smallThumbnail -
  item[index].volumeInfo.infoLink
*/
