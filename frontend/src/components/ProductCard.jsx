import {
  Box,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
  Text,
  Image,
  useToast,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Input,
  VStack,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";


const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColour = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, msg } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: msg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };


  const handleUpdateProduct = async (id, updatedProduct) => {
    const {success, msg} = await updateProduct(id, updatedProduct)
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
    }
    onClose()
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      ></Image>
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {" "}
          {product.name}
        </Heading>
        <Text color={textColour} fontWeight="bold" fontSize="xl" >
          £{product.price}
        </Text>
        <Text color={textColour}  fontSize="xl" mb={4}>
          {product.description}
        </Text>

        <HStack>
          <IconButton icon={<EditIcon />}  onClick={onOpen} colorScheme="blue" />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                <Input placeholder="Price" name="price" type="number" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                <Input placeholder="Description" name="name" value={updatedProduct.description} onChange={(e) => setUpdatedProduct({...updatedProduct, description: e.target.value})}/>
              </VStack>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Close</Button>
          </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default ProductCard;

// onClick={() => handleDelete(product._id)}  onClick={onOpen}
