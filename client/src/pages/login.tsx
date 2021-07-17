import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";
import { GoogleLogin } from "react-google-login";
import router from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken, setRefreshToken } from "../utils/tokens";
import { CLIENT_ID } from "../utils/constants";
// Join the community of Readers with bookBUG.
// Connect with other passionate readers and get book recommendations and suggestions all at one place.

const Login: React.FC = () => {
  const [login] = useLoginMutation();

  const responseGoogle = async (response) => {
    const { name, email, imageUrl } = response.profileObj;
    const { data } = await login({
      variables: { email: email, name: name, imageUrl: imageUrl },
    });
    setAccessToken(data.login.accessToken);
    setRefreshToken(data.login.refreshToken);
    router.push("/me");
  };

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
          <Flex mt="1rem" flexDirection="column">
            <GoogleLogin
              clientId={CLIENT_ID}
              onSuccess={responseGoogle}
              onFailure={(err) => console.log(err)}
            />
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
