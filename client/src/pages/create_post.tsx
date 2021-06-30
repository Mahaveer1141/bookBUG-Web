import {
  Textarea,
  Button,
  Flex,
  Box,
  Icon,
  Link,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { MeProps } from "../types";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";
import { IoMdArrowBack } from "react-icons/io";
import { Formik } from "formik";
import { useCreatePostMutation } from "../generated/graphql";
import dynamic from "next/dynamic";
import Router from "next/router";

const Navbar = dynamic(import("../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const CreatePost: React.FC<MeProps> = ({ user }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const [createPost] = useCreatePostMutation();

  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />
        <Box
          w={["70%", "50%", "50%"]}
          pos="sticky"
          left={["20%", "28%", "30%"]}
          mt="1.5rem"
        >
          <Link href="/">
            <Icon as={IoMdArrowBack} />
          </Link>

          <Formik
            enableReinitialize={false}
            initialValues={{
              text: "",
              imageUrl: "",
            }}
            onSubmit={async (values, actions) => {
              if (!selectedFile) {
                const data = await createPost({ variables: values });
                console.log(data);
                actions.setSubmitting(false);
                Router.replace("/");
                return;
              }
              const reader = new FileReader();
              reader.readAsDataURL(selectedFile);
              reader.onloadend = async () => {
                values.imageUrl = reader.result.toString();
                const data = await createPost({ variables: values });
                console.log(data);
                actions.setSubmitting(false);
                Router.replace("/");
              };
            }}
          >
            {({ values, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <FormControl isRequired={true} mt="1rem" id="text">
                  <FormLabel>Text</FormLabel>
                  <Textarea
                    required
                    placeholder="Text"
                    name="text"
                    value={values.text}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mt="1rem" id="imageUrl">
                  <FormLabel>Image</FormLabel>
                  <input
                    style={{ width: "100%" }}
                    accept=".png, .jpeg, .jpg"
                    name="imageUrl"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    type="file"
                  />
                </FormControl>

                <Button
                  isLoading={isSubmitting}
                  mt="1rem"
                  colorScheme="blue"
                  type="submit"
                >
                  Post
                </Button>
              </form>
            )}
          </Formik>
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
