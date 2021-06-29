import { Textarea, Button, Flex, Box, Icon, Link } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { MeProps } from "../types";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";
import { IoMdArrowBack } from "react-icons/io";

const CreatePost: React.FC<MeProps> = ({ user }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      console.log(reader.result);
    };
  };

  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box p={10}>
          <Link href="/">
            <Icon as={IoMdArrowBack} />
          </Link>
          <form onSubmit={handleSubmitFile}>
            <Textarea placeholder="Add post" />
            <input
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
              type="file"
            />
            <Button type="submit">Post</Button>
          </form>
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
