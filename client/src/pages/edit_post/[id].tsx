import { gql } from "@apollo/client";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../generated/graphql";
import { EditPostProps } from "../../types";
import { createClient } from "../../utils/apolloClient";
import { MeQuery } from "../../utils/MeQuery";

const Navbar = dynamic(import("../../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const App: React.FC<EditPostProps> = ({ user, post }) => {
  const router = useRouter();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

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
          <Formik
            enableReinitialize={false}
            initialValues={{
              text: post.text,
              imageUrl: post.imageUrl,
            }}
            onSubmit={async (values, actions) => {
              actions.setSubmitting(true);
              if (!selectedFile) {
                updatePost({
                  variables: {
                    postId: Number(post.id),
                    text: values.text,
                    imageUrl: values.imageUrl,
                  },
                });
                actions.setSubmitting(false);
                router.replace("/");
                return;
              }
              const reader = new FileReader();
              reader.readAsDataURL(selectedFile);
              reader.onloadend = async () => {
                actions.setSubmitting(true);
                values.imageUrl = reader.result.toString();
                updatePost({
                  variables: {
                    postId: Number(post.id),
                    text: values.text,
                    imageUrl: values.imageUrl,
                  },
                });
                actions.setSubmitting(false);
                router.replace("/");
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
                <Flex mt="1rem">
                  <Button
                    isLoading={isSubmitting}
                    colorScheme="blue"
                    type="submit"
                  >
                    Post
                  </Button>
                  <IconButton
                    onClick={() => {
                      deletePost({ variables: { postId: Number(post.id) } });
                      router.replace("/");
                    }}
                    colorScheme="red"
                    ml="1rem"
                    aria-label=""
                    icon={<DeleteIcon />}
                  />
                </Flex>
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

  const id = ctx.query.id;

  const { data } = await apolloClient.query({
    query: MeQuery,
  });

  const onePost = await apolloClient.query({
    query: gql`
      query GetOnePost {
        getOnePost(postId: ${id}) {
          id
          text
          imageUrl
          createdAt
          updatedAt
          creatorId
          creator {
            id
            username
            photoUrl
            displayName
          }
          num_likes
          isLiked
          isMe
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
  if (!onePost.data.getOnePost.isMe) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: data?.Me,
      post: onePost.data.getOnePost,
    },
  };
};

export default App;
