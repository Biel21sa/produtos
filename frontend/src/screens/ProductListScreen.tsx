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
import { removeProduct } from "../services/product/removeProduct";
import { useProducts } from "../services/product/getProducts";
import "../styles/ProductListScreen.scss";

export const ProductListScreen: React.FC = () => {
  const [filter, setFilter] = useState("");

  useEffect(() => {
    document.title = "Produto - Lista";
  }, []);

  const { data: products, error, isLoading } = useProducts();

  if (error) return <Box>Erro ao carregar os produtos.</Box>;
  if (isLoading) return <Box>Carregando produtos...</Box>;
  if (!products) return null;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box className="product-list" minH="100vh">
      <Box className="product-list__header">
        <Heading size="lg" className="product-list__title">
          Produtos
        </Heading>

        <Box className="product-list__actions">
          <Input
            placeholder="Filtrar por nome"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="product-list__filter"
            bg="white"
          />
          <Link to="/product/0">
            <Button colorScheme="green" className="product-list__button">
              Adicionar Produto
            </Button>
          </Link>
        </Box>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={6}
        className="product-list__grid"
      >
        {filtered.map((product) => (
          <Box key={product.id} className="product-card">
            <img
              src={product.photo}
              alt={product.name}
              className="product-card__image"
            />
            <Heading size="md" mt={2} className="product-card__name">
              {product.name}
            </Heading>
            <p className="product-card__price">
              {Number(product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="product-card__qty">Qtd: {product.qty}</p>

            <Flex mt={2} gap={2}>
              <Link to={`/product/${product.id}`}>
                <Button size="sm" colorScheme="green">
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
