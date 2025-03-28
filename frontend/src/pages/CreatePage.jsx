import {
  Box,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  Button,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const toast = useToast()
  const {createProduct, fetchProducts} = useProductStore()
  const handleAddProduct = async() => {
    const {success, msg} = await createProduct(newProduct)
    console.log(success, msg)
    if(!success){
        toast({
            title: "Error",
            description: msg,
            status: "error",
            duration: 5000,
            isClosable: true,
        })
    }
    else {
        toast({
            title: "Success",
            description: msg,
            status: "success",
            duration: 5000,
            isClosable: true,
        })
        setNewProduct({
            name: "",
            price: "",
            description: "",
            image: "",
          });
          fetchProducts()
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          p={8}
          borderRadius={8}
          boxShadow={"lg"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
                <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
                <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
                <Input
              placeholder="Description"
              name="name"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
            <Button onClick={() => handleAddProduct()}>Submit</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
