// * www.googleapis.com/books/v1/volumes/volumeId

import { Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { MeProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const ShowBook: React.FC<MeProps> = ({ user }) => {
  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex>
        <Sidebar page="Home" />
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = createClient(ctx as any);

  const { data } = await apolloClient.query({
    query: MeQuery,
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
    },
  };
};

export default ShowBook;

/* 
  item[index].id
  item[index].volumeInfo.title
  item[index].volumeInfo.authors.forEach
  item[index].volumeInfo.publisher
  item[index].volumeInfo.description
  item[index].volumeInfo.pageCount
  item[index].volumeInfo.categories.forEach
  item[index].volumeInfo.averageRating
  item[index].volumeInfo.imageLinks.smallThumbnail
  item[index].volumeInfo.infoLink
*/
