# 🛒 Sistema de Cadastro de Produtos

Este projeto é um sistema simples de cadastro de produtos com funcionalidades de criação, edição e listagem. O frontend foi desenvolvido em React utilizando Chakra UI, e o backend foi implementado com Node.js e Express. O sistema também permite associar categorias aos produtos.

---

## 📦 Tecnologias Utilizadas

### 🔹 **Frontend**

- **React com Vite** – Biblioteca moderna e eficiente para construção de interfaces dinâmicas.
- **Chakra UI** – Framework de componentes visuais acessíveis e com design responsivo.
- **React Router DOM** – Controle de rotas e navegação entre páginas.
- **SWR** – Gerenciamento eficiente de requisições e cache.
- **Shadcn** – Biblioteca para componentes estilizados com base em design system.
- **SASS** – Pré-processador CSS para um estilo mais organizado e modular.
- **TypeScript** – Tipagem estática que ajuda a melhorar a segurança e robustez do código JavaScript.
- **react-number-format** – Biblioteca para formatação de números em campos de entrada, como preços e valores monetários, com suporte a separadores de milhar, decimais e prefixos.

### 🔹 **Backend**

- **Node.js + Express** – Ambiente e framework para criação de APIs RESTful, leves e eficientes.
- **Cors** – Middleware para habilitar requisições cross-origin.
- **Body-parser / JSON parsing nativo** – Para interpretar corretamente requisições com JSON.
- **Lowdb ou qualquer estrutura simples de persistência local (JSON)** – Estrutura simples de persistência local com arquivos JSON (ideal para testes rápidos e protótipos).
- **PostgreSQL** – Banco de dados relacional utilizado na versão de produção.
- **TypeORM** – ORM para manipulação de dados no banco de forma eficiente e com suporte a migrations.
- **Docker** – Para criação e gerenciamento de containers, facilitando o ambiente de desenvolvimento e produção.
- **class-validator** – Biblioteca para validação de dados em classes, permitindo garantir a integridade e formato das informações recebidas.
- **class-transformer** – Biblioteca para transformação de objetos, facilitando a conversão entre tipos de dados e realizando transformações automáticas nas propriedades.
- **husky** – Ferramenta para automação de hooks de Git, permitindo que ações como testes e linting sejam executadas antes de commits e pushs.

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

3. Inicie o container do Docker:

```bash
docker-compose up --build
```

4. Inicie o servidor:

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

## 💡 Funcionalidades e Comportamento do Sistema

- **Cadastro de Produtos:** Permite criar, editar e listar produtos. Cada produto possui um nome, quantidade, preço e uma foto associada via URL.

- **Associação de Categorias:** Produtos podem ser associados a múltiplas categorias, selecionadas por checkboxes. As categorias são carregadas dinamicamente do backend.

- **Listagem de Produtos:** A listagem é atualizada automaticamente após criação ou edição de produtos, utilizando mutate() do SWR para um comportamento reativo e otimizado.

- **Persistência de Dados:** Durante os testes, a persistência dos dados é feita usando Lowdb, enquanto na produção utiliza-se o banco de dados PostgreSQL com o ORM TypeORM.

## 📬 Contato

Em caso de dúvidas ou sugestões, sinta-se à vontade para abrir uma issue ou entrar em contato comigo diretamente.

GitHub: Biel21sa
Email: gabriel21silvaalves@gmail.com
