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

const ShowPost: React.FC = () => {
  const [hidden, setHidden] = useState<boolean>(true);

  const CommentBox = () => {
    return (
      <Box mt="1rem">
        <Flex alignItems="center">
          <Image
            src="/static/Itachi.jpeg"
            h="30px"
            w="30px"
            borderRadius="100px"
          />
          <Text fontWeight="medium" ml={3}>
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
          src="/static/Itachi.jpeg"
          h="30px"
          w="30px"
          borderRadius="100px"
        />
        <Text fontWeight="medium" ml={3}>
          Username
        </Text>
        <Text fontSize="0.7rem" ml="auto">
          2m ago
        </Text>
      </Flex>
      <Text mt="1rem">
        Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem,
        quibusdam numquam? Quibusdam consequuntur minima ratione mollitia
        nesciunt dolorum excepturi nobis libero similique? Harum ad quos
        temporibus expedita error nihil itaque.
      </Text>
      <Flex justifyContent="center" w="100%">
        <Image mt="1rem" maxW="100%" maxH="30rem" src="/static/Kira.jpeg" />
      </Flex>
      <Flex mt="2rem" alignItems="center">
        <Icon
          _hover={{ cursor: "pointer" }}
          color="red"
          h="20px"
          w="20px"
          as={AiFillLike}
        />
        <Text fontSize="0.8rem">50</Text>
        <Icon
          _hover={{ cursor: "pointer" }}
          ml="1rem"
          h="20px"
          w="20px"
          onClick={() => setHidden(!hidden)}
          as={BiCommentDetail}
        />
      </Flex>
      <Box hidden={hidden} mt="1rem" height="200px" pos="sticky">
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
        <Box pos="sticky" height="190px" overflowY="auto">
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
