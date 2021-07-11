import { Flex, Button, Image, Text, Box, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMakeFollowMutation } from "../generated/graphql";
import { MeProps } from "../types";

const ShowBasicUser: React.FC<MeProps> = ({ user }) => {
  const [makeFollow] = useMakeFollowMutation();
  const [isFollowed, setFollowed] = useState<boolean>(user.isFollowed);

  return (
    <Flex alignItems="center" mt="1.5rem">
      <Flex as="a" href={"/user/" + user.id}>
        <Image src={user.photoUrl} h="60px" w="60px" borderRadius="100px" />
        <Box ml={3}>
          <Text fontWeight="medium" ml={3}>
            {user.displayName}
          </Text>
          <Text fontSize="1.1rem" color="grey">
            {user.username}
          </Text>
        </Box>
      </Flex>
      <Button
        variant={isFollowed ? "outline" : "solid"}
        colorScheme="blue"
        ml={5}
        onClick={() => {
          setFollowed(!isFollowed);
          makeFollow({ variables: { followingId: Number(user.id) } });
        }}
        size="xs"
      >
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </Flex>
  );
};

export default ShowBasicUser;
