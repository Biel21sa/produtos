# 🛒 Sistema de Cadastro de Produtos

Este projeto é um sistema simples de cadastro de produtos com frontend em React + Chakra UI e backend em Node.js com Express. Ele permite criar, editar e listar produtos com categorias associadas.

---

## 📦 Tecnologias Utilizadas

### 🔹 **Frontend**

- **React com Vite** – biblioteca moderna e eficiente para construção de interfaces dinâmicas.
- **Chakra UI** – framework de componentes visuais acessíveis e com design responsivo.
- **React Router DOM** – para controle de rotas e navegação entre páginas.
- **SWR** – gerenciamento eficiente de requisições e cache.
- **Shadcn**
- **SASS**
- **TypeScript** – adiciona tipagem estática ao JavaScript, aumentando a robustez do código.

### 🔹 **Backend**

- **Node.js + Express** – servidor leve e rápido para criar APIs RESTful.
- **Cors** – middleware para habilitar requisições cross-origin.
- **Body-parser / JSON parsing nativo** – para interpretar corretamente requisições com JSON.
- **Lowdb ou qualquer estrutura simples de persistência local (JSON)** – útil para testes rápidos sem necessidade de banco externo.
- **Docker** (opcional, para facilitar o setup do banco)
- **PostgreSQL**
- **TypeORM**

---

## ▶️ Como Rodar o Projeto Localmente

### 🔧 Pré-requisitos

- Node.js instalado
- Gerenciador de pacotes `npm` ou `yarn`

### 📁 Clonando o Repositório

```bash
git clone https://github.com/Biel21sa/produtos
cd produtos
```

### Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
npm start
```

Por padrão, o backend estará disponível em: http://localhost:3001

### Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend será iniciado em: http://localhost:5173

## 💡 Informações Adicionais

- Os produtos podem ter múltiplas categorias, selecionadas via checkboxes.

- As categorias são carregadas do backend e associadas por id.

- Ao criar ou editar um produto, a listagem geral é atualizada automaticamente via mutate() do SWR.

- O projeto foi pensado para ser simples e didático, ideal para aprendizado de integração frontend-backend com foco em CRUD.

## 📬 Contato

Em caso de dúvidas ou sugestões, sinta-se à vontade para abrir uma issue ou entrar em contato!
