import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== "0";
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:3000/products/${id}`).then((res) => {
        const p = res.data;
        setName(p.name);
        setQty(p.qty);
        setPrice(p.price);
        setPhoto(p.photo);
      });
    }
  }, [id]);

  const handleSubmit = async () => {
    const payload = { name, qty, price, photo };
    if (isEdit) {
      await axios.patch(`http://localhost:3000/products/${id}`, payload);
      toast({ title: "Produto atualizado.", status: "success" });
    } else {
      await axios.post("http://localhost:3000/products", payload);
      toast({ title: "Produto criado.", status: "success" });
    }
    navigate("/product");
  };

  return (
    <Box p={4} maxW="600px" mx="auto">
      <Heading size="lg" mb={4}>
        {isEdit ? "Editar Produto" : "Novo Produto"}
      </Heading>

      <FormControl mb={4}>
        <FormLabel>Nome</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Quantidade</FormLabel>
        <NumberInput value={qty} min={0} onChange={(_, n) => setQty(n)}>
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Preço</FormLabel>
        <NumberInput
          value={price}
          min={0}
          precision={2}
          onChange={(_, n) => setPrice(n)}
        >
          <NumberInputField />
        </NumberInput>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Foto (URL)</FormLabel>
        <Input value={photo} onChange={(e) => setPhoto(e.target.value)} />
      </FormControl>

      <Button colorScheme="green" onClick={handleSubmit}>
        {isEdit ? "Atualizar" : "Criar"} Produto
      </Button>
    </Box>
  );
};
