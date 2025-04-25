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
  CheckboxGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { fetcher } from "../utils/fetcher";

export const ProductFormScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = id !== "0";
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    document.title = "Produto - Formulário";
  }, []);

  // Fetch categorias
  useEffect(() => {
    fetch("http://localhost:3001/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erro ao carregar categorias", err));
  }, []);

  // Fetch produto (modo edição)
  const { data, error } = useSWR(
    isEdit ? `http://localhost:3001/product/${id}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setName(data.name);
      setQty(data.qty);
      setPrice(data.price);
      setPhoto(data.photo);
      setCategoryIds(data.categories?.map((c: { id: string }) => c.id) || []);
    }
  }, [data]);

  const handleSubmit = async () => {
    const payload = { name, qty, price, photo, categoryIds };

    try {
      const url = isEdit
        ? `http://localhost:3001/product/${id}`
        : `http://localhost:3001/product`;

      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Erro ao enviar produto");
      }

      toast({
        title: isEdit ? "Produto atualizado" : "Produto criado",
        status: "success",
      });

      mutate("http://localhost:3001/product");
      navigate("/product");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      toast({ title: "Erro", description: errorMessage, status: "error" });
    }
  };

  if (error) return <Box>Erro ao carregar produto.</Box>;
  if (isEdit && !data) return <Box>Carregando...</Box>;

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

      <FormControl mb={4}>
        <FormLabel>Categorias</FormLabel>
        <CheckboxGroup
          value={categoryIds}
          onChange={(val) => setCategoryIds(val as string[])}
        >
          <Stack spacing={2}>
            {categories.map((cat) => (
              <Checkbox key={cat.id} value={cat.id}>
                {cat.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <Button colorScheme="green" onClick={handleSubmit}>
        {isEdit ? "Atualizar" : "Criar"} Produto
      </Button>
    </Box>
  );
};
