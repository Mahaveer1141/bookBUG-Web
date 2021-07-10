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
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavbarProps } from "../types";

const Navbar: React.FC<NavbarProps> = ({ photoUrl }) => {
  const hideTitle = useMediaQuery({ maxWidth: 600 });
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  return (
    <div>
      <Flex
        justifyContent="space-around"
        alignItems="center"
        p={3}
        bg="blue.500"
      >
        <Link _hover={{ textDecoration: "none" }} href="/">
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
        </Link>

        <Box w={["60%", "50%", "50%"]}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/${inputValue}`);
              setInputValue("");
            }}
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={inputValue}
                isRequired
                onChange={(e) => setInputValue(e.target.value)}
                bg="smokewhite"
                placeholder="Search user or book here..."
                w="100%"
                size="md"
              />
            </InputGroup>
          </form>
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
