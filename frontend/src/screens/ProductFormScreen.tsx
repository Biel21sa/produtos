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
import { NumericFormat } from "react-number-format";
import "../styles/ProductFormScreen.scss";

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

  useEffect(() => {
    fetch("http://localhost:3001/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erro ao carregar categorias", err));
  }, []);

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
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <Box
        p={6}
        maxW="700px"
        w="100%"
        bg="white"
        borderRadius="md"
        boxShadow="md"
      >
        <div className="form-header">
          <Button
            onClick={() => navigate("/product")}
            colorScheme="gray"
            variant="outline"
            className="back-button"
          >
            Voltar
          </Button>

          <Heading size="lg" className="form-title">
            {isEdit ? "Editar Produto" : "Novo Produto"}
          </Heading>
        </div>

        <Stack spacing={5}>
          <FormControl>
            <FormLabel>Nome</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Quantidade</FormLabel>
            <NumberInput
              value={qty}
              min={0}
              onChange={(valueString) => setQty(parseNumberInput(valueString))}
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>

          <FormControl>
            <FormLabel>Preço</FormLabel>
            <NumericFormat
              value={price}
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              allowNegative={false}
              prefix="R$ "
              onValueChange={(values) => setPrice(values.floatValue || 0)}
              customInput={Input}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Foto (URL)</FormLabel>
            <Input value={photo} onChange={(e) => setPhoto(e.target.value)} />
          </FormControl>

          <FormControl>
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

          <Button colorScheme="green" onClick={handleSubmit} size="lg">
            {isEdit ? "Atualizar" : "Criar"} Produto
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

const parseNumberInput = (value: string) => {
  const parsed = Number(value);
  return isNaN(parsed) ? 0 : parsed;
};
