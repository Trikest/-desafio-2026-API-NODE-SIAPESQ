# 🧠 SIAPESQ - API REST para Gerenciamento de Espécies

API REST desenvolvida como desafio técnico para a SIAPESQ, utilizando NestJS, Prisma ORM e PostgreSQL.

A aplicação permite:

- Cadastro de espécies
- Autenticação com JWT
- Filtros e estatísticas
- Integração com API externa de clima
- Testes unitários e de integração

---

# 🚀 Tecnologias Utilizadas

## Backend

- Node.js
- TypeScript
- NestJS

## Banco de Dados

- PostgreSQL
- Prisma ORM

## Autenticação

- JWT (JSON Web Token)
- Passport JWT
- Bcrypt

## Validação

- class-validator
- class-transformer

## Integração Externa

- HG Brasil Weather API

## Testes

- Jest
- Supertest

## Deploy

- Railway

---

# 🌐 API Online

```txt
https://desafio-2026-api-node-siapesq-production.up.railway.app/

📦 Funcionalidades
🔐 Autenticação
Registro de usuário
Login com JWT
Rotas protegidas
🌿 Espécies
Criar espécie
Listar espécies
Buscar por nome
Filtrar por categoria
Buscar por proximidade
Atualizar espécie
Remover espécie
📊 Estatísticas
Quantidade de espécies por categoria
🌍 Integração Externa

Ao cadastrar uma espécie, a API pode buscar automaticamente:

Temperatura
Umidade
Descrição climática

com base na latitude e longitude.

🛠️ Como Executar o Projeto
1. Clone o repositório
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
2. Acesse a pasta
cd api-especies
3. Instale as dependências
npm install
4. Configure as variáveis de ambiente

Crie um arquivo .env:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="sua_chave_jwt"
WEATHER_API_KEY="sua_api_key"
5. Execute as migrations
npx prisma migrate dev
6. Gere o Prisma Client
npx prisma generate
7. Execute a aplicação
npm run start:dev

Servidor:

http://localhost:3000
🧪 Executando os Testes
Testes unitários
npm run test
Testes de integração
npm run test:e2e
📮 Collection Postman

A collection do Postman está disponível no projeto:

SIAPESQ_API.postman_collection.json
🔑 Autenticação

As rotas protegidas utilizam JWT.

Enviar no header:

Authorization: Bearer TOKEN
📌 Principais Endpoints
Auth
Registrar usuário
POST /auth/register
Login
POST /auth/login
Categories
Criar categoria
POST /categories
Listar categorias
GET /categories
Species
Criar espécie
POST /species
Listar espécies
GET /species
Buscar por nome
GET /species?search=Arara
Filtrar por categoria
GET /species?categoryId=ID
Buscar por proximidade
GET /species?latitude=-7.11&longitude=-34.84&radius=10
Estatísticas
GET /species/stats/categories
🧱 Arquitetura

O projeto foi organizado utilizando arquitetura modular do NestJS:

auth
user
species
categories
weather
prisma

Cada módulo contém:

controller
service
dto
testes
🔒 Segurança
Senhas criptografadas com bcrypt
JWT para autenticação
Validação de DTOs
Proteção de rotas
Controle de ownership dos dados