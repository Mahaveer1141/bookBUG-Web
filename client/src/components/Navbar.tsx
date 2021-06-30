import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  Box,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { NavbarProps } from "../types";

const Navbar: React.FC<NavbarProps> = ({ photoUrl }) => {
  const hideTitle = useMediaQuery({ maxWidth: 600 });

  return (
    <div>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        p={3}
        bg="blue.500"
      >
        <Flex justifyContent="center" alignItems="center">
          <Image w={["30px", "30px", "40px"]} src="/static/Frame.svg" />
          <Text
            hidden={hideTitle}
            ml="10px"
            color="white"
            fontWeight="bold"
            fontSize="1.5rem"
          >
            bookBUG
          </Text>
        </Flex>

        <Box w={["60%", "50%", "50%"]}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              bg="smokewhite"
              placeholder="Search user or book here..."
              w="100%"
              size="md"
            />
          </InputGroup>
        </Box>

        <Link href="/me">
          <Image
            borderRadius={100}
            h={["30px", "30px", "40px"]}
            w={["30px", "30px", "40px"]}
            src={photoUrl}
          />
        </Link>
      </Flex>
    </div>
  );
};

export default Navbar;
