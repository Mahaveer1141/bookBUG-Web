import React from "react";
import { Flex, Text, Icon, Link } from "@chakra-ui/react";
import { NavItemProps } from "../types";

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  active,
  navSize,
  to,
}) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
    >
      <Link
        href={to}
        backgroundColor={active && "blue.400"}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: "none", backgroundColor: "blue.400" }}
        w={navSize == "large" && "100%"}
      >
        <Flex alignItems="center">
          <Icon as={icon} fontSize="md" color={active ? "#fff" : "gray.500"} />
          <Text
            color={active ? "#fff" : "gray.500"}
            ml={5}
            display={navSize == "small" ? "none" : "flex"}
          >
            {title}
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default NavItem;
