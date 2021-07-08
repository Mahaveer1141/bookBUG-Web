import { Flex, Button, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMakeFollowMutation } from "../generated/graphql";
import { MeProps } from "../types";

const ShowBasicUser: React.FC<MeProps> = ({ user }) => {
  const [makeFollow] = useMakeFollowMutation();
  const [isFollowed, setFollowed] = useState<boolean>(user.isFollowed);

  return (
    <Flex>
      <Image src={user.photoUrl} h="30px" w="30px" borderRadius="100px" />
      <Text fontWeight="medium" ml={3}>
        {user.displayName}
      </Text>
      <Button
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
