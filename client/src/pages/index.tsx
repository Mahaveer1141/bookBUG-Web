import React from "react";
import { GetServerSideProps } from "next";
import { MeQuery } from "../utils/MeQuery";
import { createClient } from "../utils/apolloClient";
import { MeProps, PostType } from "../types";
import dynamic from "next/dynamic";
import { Box, Flex, Text, Button, Icon, Link } from "@chakra-ui/react";
import { IoMdCreate } from "react-icons/io";
import ShowPost from "../components/ShowPost";
import Nextlink from "next/link";
import { useGetAllPostQuery } from "../generated/graphql";

const Navbar = dynamic(import("../components/Navbar"), {
  ssr: typeof window === undefined,
});

const Sidebar = dynamic(import("../components/Sidebar"), {
  ssr: typeof window === undefined,
});

const App: React.FC<MeProps> = ({ user }) => {
  const { data, loading } = useGetAllPostQuery();
  if (loading) {
    return <div>loading</div>;
  }
  console.log(data?.getAllPost);

  return (
    <>
      <Navbar photoUrl={user.photoUrl} />
      <Flex w="100%">
        <Sidebar page="Home" />

        <Box mt="2rem" pos="fixed" w="50%" h="89vh" left="30%">
          <Flex>
            <Text fontSize="1.4rem" fontWeight="medium" color="grey.500">
              My Feed
            </Text>
            <Nextlink href="/create_post">
              <Button
                leftIcon={<Icon as={IoMdCreate} />}
                colorScheme="blue"
                ml="auto"
              >
                Create Post
              </Button>
            </Nextlink>
          </Flex>
          <Box
            pl="0.5rem"
            pr="0.5rem"
            mt="1rem"
            pb="10rem"
            h="81vh"
            overflowY="auto"
          >
            {data?.getAllPost === undefined || data?.getAllPost.length === 0 ? (
              <Text>
                No Post to show <Link href="/create_post">Create here</Link>
              </Text>
            ) : (
              data.getAllPost.map((post, key) => (
                <div key={key}>
                  <ShowPost showCommentIcon={true} post={post} />
                </div>
              ))
            )}
          </Box>
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

export default App;
