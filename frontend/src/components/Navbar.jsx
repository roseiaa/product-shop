import { Container, Flex, HStack, Button, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus} from "react-icons/ci";
import React from "react";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <CiSquarePlus fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? "⏾" : "☀︎"}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
