import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Input,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  qty: number;
  photo: string;
}

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id: string) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg">Produtos</Heading>
        <Link to="/product/0">
          <Button colorScheme="green">Adicionar Produto</Button>
        </Link>
      </Flex>

      <Input
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        mb={4}
      />

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {filtered.map((product) => (
          <Box
            key={product.id}
            borderWidth={1}
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <img src={product.photo} alt={product.name} width="100%" />
            <Heading size="md" mt={2}>
              {product.name}
            </Heading>
            <p>Preço: R$ {product.price}</p>
            <p>Quantidade: {product.qty}</p>

            <Flex mt={2} gap={2}>
              <Link to={`/product/${product.id}`}>
                <Button size="sm" colorScheme="blue">
                  Editar
                </Button>
              </Link>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => removeProduct(product.id)}
              >
                Remover
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
