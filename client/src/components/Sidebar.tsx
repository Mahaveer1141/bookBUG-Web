import React from "react";
import { Flex } from "@chakra-ui/react";
import {
  FiHome,
  FiUser,
  FiBook,
  FiMessageCircle,
  FiMessageSquare,
} from "react-icons/fi";
import NavItem from "./NavItem";
import { useMediaQuery } from "react-responsive";
import { SidebarProps } from "../types";

const Sidebar: React.FC<SidebarProps> = ({ page }) => {
  const changeSize = useMediaQuery({ maxWidth: 700 });

  return (
    <Flex
      // bg="whitesmoke"
      pos="sticky"
      minH={changeSize ? "92vh" : "90vh"}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      w={changeSize ? "3.2rem" : "12rem"}
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={changeSize ? "center" : "flex-start"}
        as="nav"
      >
        <NavItem
          to="/"
          navSize={changeSize ? "small" : "large"}
          icon={FiHome}
          title="Home"
          active={page === "Home" ? true : false}
        />
        <NavItem
          to="/"
          navSize={changeSize ? "small" : "large"}
          icon={FiMessageSquare}
          title="Discussions"
          active={page === "Discussions" ? true : false}
        />
        <NavItem
          to="/"
          navSize={changeSize ? "small" : "large"}
          icon={FiMessageCircle}
          title="Messages"
          active={page === "Messages" ? true : false}
        />
        <NavItem
          to="/"
          navSize={changeSize ? "small" : "large"}
          icon={FiBook}
          title="My Library"
          active={page === "My Library" ? true : false}
        />
        <NavItem
          to="/me"
          navSize={changeSize ? "small" : "large"}
          icon={FiUser}
          title="Me"
          active={page === "Me" ? true : false}
        />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
