import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";

// Join the community of Readers with bookBUG.
// Connect with other passionate readers and get book recommendations and suggestions all at one place.

const Login: React.FC = () => {
  const [googleSubmitting, setGoogleSubmitting] = useState<boolean>(false);
  const [githubSubmitting, setGithubSubmitting] = useState<boolean>(false);

  return (
    <div>
      <Flex p={3} bg="blue.500">
        <Flex ml="2rem" justifyContent="center" alignItems="center">
          <Image w={["22px", "30px", "40px"]} src="static/Frame.svg" />
          <Text ml="10px" color="white" fontWeight="bold" fontSize="1.5rem">
            bookBUG
          </Text>
        </Flex>
        <Flex mr="2rem" ml="auto">
          <NextLink href="/">
            <Image
              _hover={{ cursor: "pointer" }}
              w={["12px", "15px", "20px"]}
              src="static/Linkedin.svg"
            />
          </NextLink>
          <NextLink href="/">
            <Image
              _hover={{ cursor: "pointer" }}
              ml="20px"
              w={["12px", "15px", "20px"]}
              src="static/Github.svg"
            />
          </NextLink>
        </Flex>
      </Flex>
      <Flex
        borderRadius="3px"
        justifyContent="center"
        alignItems="center"
        h="90vh"
      >
        <Box p={10} bg="whitesmoke">
          <Text color="blue.500" fontWeight="bold" fontSize="1.4rem">
            Welcome to bookBUG
          </Text>
          <Text mt="0.4rem" fontSize="1.1rem">
            Login to continue
          </Text>
          <Flex flexDirection="column">
            <Button
              w="100%"
              isLoading={googleSubmitting}
              as="a"
              href="https://book-bug.herokuapp.com/auth/google"
              mt="1rem"
              bg="#fff"
              disabled={githubSubmitting}
              onClick={() => {
                githubSubmitting ? null : setGoogleSubmitting(true);
              }}
            >
              <Image mr={5} h="22px" w="22px" src="/static/Google.svg" />
              Log in with Google
            </Button>
            <Button
              w="100%"
              isLoading={githubSubmitting}
              as="a"
              href="http://localhost:5000/auth/github"
              mt="1rem"
              variant="black"
              color="white"
              disabled={googleSubmitting}
              onClick={() => {
                googleSubmitting ? null : setGithubSubmitting(true);
              }}
            >
              <Image mr={5} h="22px" w="22px" src="/static/Github.svg" />
              Log in with Github
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = createClient(ctx as any);

  const { data } = await apolloClient.query({
    query: MeQuery,
  });

  console.log(data);

  if (data?.Me !== null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
