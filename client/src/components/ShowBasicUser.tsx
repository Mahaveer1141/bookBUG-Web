import { Flex, Button, Image, Text, Box, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMakeFollowMutation } from "../generated/graphql";
import { ShowBasicUserProps } from "../types";

const ShowBasicUser: React.FC<ShowBasicUserProps> = ({ me, user }) => {
  const [makeFollow] = useMakeFollowMutation();
  const [isFollowed, setFollowed] = useState<boolean>(user.isFollowed);

  return (
    <Flex alignItems="center" mt="1.5rem">
      <Flex as="a" href={me.id === user.id ? "/me" : "/user/" + user.id}>
        <Image src={user.photoUrl} h="60px" w="60px" borderRadius="100px" />
        <Box ml={3}>
          <Text fontWeight="medium" ml={3}>
            {user.displayName}
          </Text>
          <Text fontSize="1.1rem" ml={3} color="grey">
            {user.username}
          </Text>
        </Box>
      </Flex>
      {me.id !== user.id ? (
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
      ) : null}
    </Flex>
  );
};

export default ShowBasicUser;
