import {
  Textarea,
  Button,
  Flex,
  Box,
  Icon,
  Link,
  Input,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { MeProps } from "../types";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";
import { IoMdArrowBack } from "react-icons/io";

const CreatePost: React.FC<MeProps> = ({ user }) => {
  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box p={10}>
          <Link href="/">
            <Icon as={IoMdArrowBack} />
          </Link>
          <Textarea />
          <input type="file" />
          <Button>Post</Button>
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

export default CreatePost;
