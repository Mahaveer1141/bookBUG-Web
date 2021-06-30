import React, { useState } from "react";
import {
  Flex,
  Box,
  Image,
  Text,
  Icon,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { ShowPostProps } from "../types";
import { useChangeLikeMutation } from "../generated/graphql";

const ShowPost: React.FC<ShowPostProps> = ({ post }) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [changeLike] = useChangeLikeMutation();
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const [numLike, setNumLike] = useState<number>(post.num_likes);

  const CommentBox = () => {
    return (
      <Box mt="1rem">
        <Flex alignItems="center">
          <Image
            src="/static/Itachi.jpeg"
            h="20px"
            w="20px"
            borderRadius="100px"
          />
          <Text fontSize="0.9rem" fontWeight="medium" ml={3}>
            Username
          </Text>
          <Text fontSize="0.7rem" ml="auto">
            2m ago
          </Text>
        </Flex>
        <Text mt="0.6rem">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat,
          molestias mollitia atque aspernatur quibusdam animi dolores at
          reiciendis magnam cumque quaerat assumenda autem accusamus tempora
          consequatur alias ducimus facere ipsum?
        </Text>
      </Box>
    );
  };

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
          {post.creator.username}
        </Text>
        <Text fontSize="0.7rem" ml="auto">
          2m ago
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
        <Icon
          _hover={{ cursor: "pointer" }}
          ml="1rem"
          h="20px"
          w="20px"
          onClick={() => setHidden(!hidden)}
          as={BiCommentDetail}
        />
      </Flex>
      <Box hidden={hidden} mt="1rem" height="300px" pos="sticky">
        <Flex flexDirection="column">
          <Textarea
            ml="2%"
            w="95%"
            size="sm"
            mb="1rem"
            placeholder="Add comment"
          />
          <Button colorScheme="green" size="sm" mr="2%" ml="auto">
            Post
          </Button>
        </Flex>
        <Box pos="sticky" height="150px" overflowY="auto">
          <CommentBox />
          <CommentBox />
          <CommentBox />
          <CommentBox />
          <CommentBox />
        </Box>
      </Box>
    </Box>
  );
};

export default ShowPost;
