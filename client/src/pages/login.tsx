import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { createClient } from "../utils/apolloClient";
import { MeQuery } from "../utils/MeQuery";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import router from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { setAccessToken, setRefreshToken } from "../utils/tokens";
import { CLIENT_ID } from "../utils/constants";
import jwtDecode from "jwt-decode";

const Login: React.FC = () => {
  const [login] = useLoginMutation();

  const responseGoogle = async (response: any) => {
    const user: any = jwtDecode(response.credential);
    const { name, email, picture } = user;
    const { data } = await login({
      variables: { email: email, name: name, imageUrl: picture },
    });
    setAccessToken(data.login.accessToken);
    setRefreshToken(data.login.refreshToken);
    router.push("/me");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <Flex p={3} bg="blue.500">
          <Flex ml="2rem" justifyContent="center" alignItems="center">
            <Image w={["22px", "30px", "40px"]} src="static/Frame.svg" />
            <Text ml="10px" color="white" fontWeight="bold" fontSize="1.5rem">
              bookBUG
            </Text>
          </Flex>
          <Flex mr="2rem" ml="auto">
            <NextLink href="https://www.linkedin.com/in/mahaveer-soni-5946911a8/">
              <Image
                _hover={{ cursor: "pointer" }}
                w={["12px", "15px", "20px"]}
                src="static/Linkedin.svg"
              />
            </NextLink>
            <NextLink href="https://github.com/Mahaveer1141/">
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
                onSuccess={responseGoogle}
                onError={() => console.log("google login error")}
              />
            </Flex>
          </Box>
        </Flex>
      </div>
    </GoogleOAuthProvider>
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
