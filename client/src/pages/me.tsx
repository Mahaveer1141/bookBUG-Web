import React, { useState } from "react";
import { Formik } from "formik";
import {
  Button,
  Input,
  Flex,
  Image,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Text,
  Alert,
  AlertIcon,
  CloseButton,
  Stack,
  Link,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { MeQuery } from "../utils/MeQuery";
import { createClient } from "../utils/apolloClient";
import { useRouter } from "next/router";
import { MeProps } from "../types";
import { useLogoutMutation, useUpdateUserMutation } from "../generated/graphql";
import dynamic from "next/dynamic";
import { gql } from "@apollo/client";

const Navbar = dynamic(import("../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const Me: React.FC<MeProps> = ({ user }) => {
  const [alert, setAlert] = useState<boolean>(true);
  const [logout] = useLogoutMutation();
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();

  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Me" />
        <Box
          w={["70%", "50%", "50%"]}
          pos="sticky"
          left={["20%", "28%", "30%"]}
          mt="1.5rem"
        >
          <Alert mb="1rem" hidden={alert} status="success">
            <AlertIcon />
            Your profile is updated
            <CloseButton
              onClick={() => setAlert(true)}
              position="absolute"
              right="8px"
              top="8px"
            />
          </Alert>
          <Text fontSize="1.4rem" fontWeight="medium" color="grey.500">
            My Profile
          </Text>
          <Flex>
            <Box textAlign="center" h="150px" w="150px" mt="3rem">
              <Image
                borderRadius="100px"
                h={["70px", "70px", "100px"]}
                w={["70px", "70px", "100px"]}
                src={user.photoUrl}
              />
              <Stack mt="1rem" spacing={4}>
                <Link href={"/followers/" + user.id}>
                  <Text>{user.num_follower - 1} Followers</Text>
                </Link>
                <Link href={"/following/" + user.id}>
                  <Text>{user.num_following - 1} Following</Text>
                </Link>
                <Link href={"/user_post/" + user.id}>
                  <Text>{user.num_post} Post</Text>
                </Link>
              </Stack>

              <Button
                mt="1rem"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                colorScheme="red"
              >
                Logout
              </Button>
            </Box>
            <Box width="100%" mt="3rem" ml="15%">
              <Text fontSize="1.5rem" fontWeight="medium">
                Edit
              </Text>
              <Formik
                enableReinitialize={false}
                initialValues={{
                  displayName: user.displayName,
                  username: user.username,
                  bio: user.bio,
                }}
                onSubmit={async (values, actions) => {
                  if (values.bio === undefined) values.bio = "";
                  if (values.displayName.trim() === "") {
                    actions.setErrors({
                      displayName: "Enter display Name correctly",
                    });
                    return;
                  }
                  if (values.username.trim() === "") {
                    actions.setErrors({
                      username: "Enter username correctly",
                    });
                    return;
                  }
                  try {
                    const data = await updateUser({ variables: values });
                    actions.setSubmitting(false);
                    console.log(data);
                    if (data.data?.UpdateUser.errors) {
                      actions.setErrors({
                        username: "Username already Exists",
                      });
                      return;
                    }
                    setAlert(false);
                  } catch (e) {
                    console.log("submit settingsCreate error =  ", e);
                  }
                }}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  errors,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl
                      isInvalid={errors.displayName ? true : false}
                      mt="1rem"
                      id="displayName"
                      isRequired
                    >
                      <FormLabel>Display Name</FormLabel>
                      <Input
                        placeholder="Display Name"
                        name="displayName"
                        value={values.displayName}
                        onChange={handleChange}
                        isRequired={true}
                      />
                      <FormErrorMessage>{errors.displayName}</FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={errors.username ? true : false}
                      mt="1rem"
                      id="username"
                      isRequired
                    >
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder="Username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isRequired={true}
                      />
                      <FormErrorMessage>{errors.username}</FormErrorMessage>
                    </FormControl>

                    <FormControl mt="1rem" id="bio">
                      <FormLabel>Bio</FormLabel>
                      <Textarea
                        placeholder="Bio"
                        name="bio"
                        value={values.bio}
                        onChange={handleChange}
                      />
                    </FormControl>

                    <Button
                      isLoading={isSubmitting}
                      mt="1rem"
                      colorScheme="blue"
                      type="submit"
                    >
                      Save
                    </Button>
                  </form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = createClient(ctx as any);

  const { data } = await apolloClient.query({
    query: gql`
      query Me {
        Me(userID: 1) {
          id
          email
          displayName
          username
          photoUrl
          bio
          num_following
          num_follower
          num_post
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
    },
  };
};

export default Me;
