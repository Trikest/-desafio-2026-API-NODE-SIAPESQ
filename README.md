# 🧠 SIAPESQ - API REST para Gerenciamento de Espécies

API desenvolvida em NestJS para gerenciamento de espécies, categorias, autenticação de usuários e integração com API climática.

---

# 🚀 Tecnologias Utilizadas

- Node.js
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt
- Jest
- API HG Brasil Weather

---

# 📦 Funcionalidades

## 🔐 Autenticação

- Registro de usuário
- Login com JWT
- Rotas protegidas

---

## 🌿 Espécies

- Criar espécie
- Listar espécies
- Buscar por nome
- Filtrar por categoria
- Buscar por proximidade
- Atualizar espécie
- Remover espécie

---

## 📊 Estatísticas

- Quantidade de espécies por categoria

---

## 🌍 Integração Externa

Ao cadastrar uma espécie, a API pode buscar automaticamente:

- Temperatura
- Umidade
- Descrição climática

com base na latitude e longitude.

---

# 🛠️ Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

---

## 2. Acesse a pasta

```bash
cd api-especies
```

---

## 3. Instale as dependências

```bash
npm install
```

---

## 4. Configure as variáveis de ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="sua_chave_jwt"
WEATHER_API_KEY="sua_api_key"
```

---

## 5. Execute as migrations

```bash
npx prisma migrate dev
```

---

## 6. Gere o Prisma Client

```bash
npx prisma generate
```

---

## 7. Execute a aplicação

```bash
npm run start:dev
```

Servidor:

```bash
http://localhost:3000
```

---

# 🧪 Executando os Testes

## Testes unitários

```bash
npm run test
```

---

## Testes de integração

```bash
npm run test:e2e
```

---

# 📮 Collection Postman

A collection do Postman está disponível no projeto:

```bash
SIAPESQ_API.postman_collection.json
```

---

# 🔑 Autenticação

As rotas protegidas utilizam JWT.

Enviar no header:

```bash
Authorization: Bearer TOKEN
```

---

# 📌 Principais Endpoints

## 🔐 Auth

### Registrar usuário

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

---

## 📂 Categories

### Criar categoria

```http
POST /categories
```

### Listar categorias

```http
GET /categories
```

---

## 🌿 Species

### Criar espécie

```http
POST /species
```

### Listar espécies

```http
GET /species
```

### Buscar por nome

```http
GET /species?search=Arara
```

### Filtrar por categoria

```http
GET /species?categoryId=ID
```

### Buscar por proximidade

```http
GET /species?latitude=-7.11&longitude=-34.84&radius=10
```

---

## 📊 Estatísticas

### Quantidade por categoria

```http
GET /species/stats/categories
```

---

# 🧱 Arquitetura

O projeto foi organizado utilizando arquitetura modular do NestJS:

- auth
- user
- species
- categories
- weather
- prisma

Cada módulo contém:

- controller
- service
- dto
- testes

---

# 🔒 Segurança

- Senhas criptografadas com bcrypt
- JWT para autenticação
- Validação de DTOs
- Proteção de rotas
- Controle de ownership dos dados

---

# ☁️ Deploy

API publicada no Railway.

URL da API:

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/

```
---

# 📘 Exemplo de Fluxo no Postman

## 1️⃣ Registrar usuário

### Endpoint

```http
POST /auth/register
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/auth/register
```

### Body

```json
{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456"
}
```

---

## 2️⃣ Fazer login

### Endpoint

```http
POST /auth/login
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/auth/login
```

### Body

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### Resposta esperada

```json
{
  "access_token": "SEU_TOKEN_JWT"
}
```

---

## 3️⃣ Criar categoria

### Endpoint

```http
POST /categories
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/categories
```

### Headers

```bash
Authorization: Bearer SEU_TOKEN_JWT
```

### Body

```json
{
  "name": "Ave"
}
```

### Resposta esperada

```json
{
  "id": "ID_DA_CATEGORIA",
  "name": "Ave"
}
```

---

## 4️⃣ Criar espécie

### Endpoint

```http
POST /species
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/species
```

### Headers

```bash
Authorization: Bearer SEU_TOKEN_JWT
```

### Body

```json
{
  "commonName": "Arara Azul",
  "scientificName": "Anodorhynchus hyacinthinus",
  "categoryId": "ID_DA_CATEGORIA",
  "latitude": -7.1195,
  "longitude": -34.8450,
  "fetchClimate": true
}
```

---

## 5️⃣ Listar espécies

### Endpoint

```http
GET /species
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/species
```

### Headers

```bash
Authorization: Bearer SEU_TOKEN_JWT
```

---

## 6️⃣ Buscar por nome

### Endpoint

```http
GET /species?search=Arara
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/species?search=Arara
```

---

## 7️⃣ Filtrar por categoria

### Endpoint

```http
GET /species?categoryId=ID_DA_CATEGORIA
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/species?categoryId=ID_DA_CATEGORIA
```



---

## 8️⃣ Estatísticas por categoria

### Endpoint

```http
GET /species/stats/categories
```

### URL

```bash
https://desafio-2026-api-node-siapesq-production.up.railway.app/species/stats/categories
```

### Headers

```bash
Authorization: Bearer SEU_TOKEN_JWT
```