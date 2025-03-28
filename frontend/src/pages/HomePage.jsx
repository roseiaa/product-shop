import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const {fetchProducts, products} = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  console.log("products", products)


  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
        >
          Current Products🧺
        </Text>

        {products.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w={"full"}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </SimpleGrid>
          
        )}
        

          {products.length === 0 && (
            <Text
            color="gray.500"
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
          >
            No products found :c {" "}
            <Link to="/create">
            <Text as ="span" color="blue.500" _hover={{textDecoration:"underline"}}>
            Add a product!
            </Text>
            </Link>
          </Text>
          
          )}
        

      </VStack>
    </Container>
  );
};

export default HomePage;
