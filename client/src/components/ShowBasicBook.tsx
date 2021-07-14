import { Flex, Image, Box, Text, Button } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useAddBookMutation } from "../generated/graphql";

interface IProps {
  item: any;
  alreadyAdded: boolean;
}

const ShowBasicBook: React.FC<IProps> = ({ item, alreadyAdded }) => {
  const [addBook] = useAddBookMutation();
  const [isAdded, setAdded] = useState<boolean>(alreadyAdded);

  return (
    <>
      <Flex alignItems="center" mt="1.5rem">
        <Flex as="a" href={"/book/" + item.id}>
          <Image
            src={item.volumeInfo.imageLinks.smallThumbnail}
            h="60px"
            w="60px"
            borderRadius="100px"
          />
          <Box ml={3}>
            <Text fontWeight="medium">{item.volumeInfo.title}</Text>
            <Text fontSize="1.1rem" color="grey">
              {item.volumeInfo.authors[0]}
            </Text>
          </Box>
        </Flex>
        <Button
          variant={isAdded ? "outline" : "solid"}
          colorScheme="blue"
          ml={5}
          onClick={() => {
            setAdded(!isAdded);
            addBook({ variables: { bookId: item.id } });
          }}
          size="xs"
        >
          {isAdded ? "Remove" : "Add"}
        </Button>
      </Flex>
    </>
  );
};

export default ShowBasicBook;
