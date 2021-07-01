import React, { useState } from "react";
import { Flex, Box, Image, Text, Icon } from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { ShowPostProps } from "../types";
import { useChangeLikeMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { timeDifference } from "../utils/timeDifference";

const ShowPost: React.FC<ShowPostProps> = ({ post, showCommentIcon }) => {
  const router = useRouter();
  const [changeLike] = useChangeLikeMutation();
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const [numLike, setNumLike] = useState<number>(post.num_likes);

  return (
    <Box mt="2rem">
      <Flex alignItems="center">
        <Image
          src={post.creator.photoUrl}
          h="30px"
          w="30px"
          borderRadius="100px"
        />
        <Text fontWeight="medium" ml={3}>
          {post.creator.displayName}
        </Text>
        <Text fontSize="0.7rem" ml="auto">
          {timeDifference(new Date(), post.updatedAt)}
        </Text>
      </Flex>
      <Text mt="1rem">{post.text}</Text>
      <Flex justifyContent="center" w="100%">
        {post.imageUrl === "" ? null : (
          <Image mt="1rem" maxW="100%" maxH="30rem" src={post.imageUrl} />
        )}
      </Flex>
      <Flex mt="2rem" alignItems="center">
        <Icon
          _hover={{ cursor: "pointer" }}
          color="red"
          h="20px"
          w="20px"
          onClick={() => {
            setNumLike((prev) => (isLiked ? prev - 1 : prev + 1));
            setIsLiked(!isLiked);
            changeLike({
              variables: { postId: Number(post.id) },
            });
          }}
          as={isLiked ? AiFillLike : AiOutlineLike}
        />
        <Text fontSize="0.8rem">{numLike}</Text>
        <Box hidden={!showCommentIcon}>
          <Icon
            _hover={{ cursor: "pointer" }}
            ml="1rem"
            h="20px"
            w="20px"
            onClick={() => router.push(`/post/${post.id}`)}
            as={BiCommentDetail}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default ShowPost;
