# Sistema de Gestão de Agendamentos de Serviços (SGAS)

## Descrição
- Aplicação Web focada em Back-End para gestão de agendamentos de serviços, com autenticação JWT, autorização por perfis, CRUDs de serviços e agendamentos, documentação Swagger e persistência em PostgreSQL via TypeORM.

## Arquitetura
- Camadas: Controllers, Services, Repositories (via TypeORM), Entities/Models, Middlewares/Guards, DTOs e Validação.
- Fluxo: Cliente → Middleware de Logs → Guard JWT → Guard de Roles → Controller → Service → Repository → Banco → Resposta.
- Estrutura: src/modules (auth, users, services, appointments), src/common, src/entities, src/config.

## Tecnologias
- Node.js, TypeScript, NestJS, PostgreSQL, TypeORM, JWT, Swagger, Jest.

## Pré-requisitos
- Node 18+, PostgreSQL, Redis opcional para filas, Docker opcional.

## Configuração
- Variáveis de ambiente em `.env` seguindo `.env.example`:
  - PORT
  - DATABASE_URL
  - JWT_SECRET
  - REDIS_URL

## Execução
- Instalação: `npm install`
- Desenvolvimento: `npm run start:dev`
- Build: `npm run build` e `npm start`
- Testes: `npm run test`

## Migrações
- O projeto está com `synchronize: true` para facilitar a demonstração. Em produção, usar migrations do TypeORM.

## Usuários de teste
- Criar via endpoint `/auth/register`. Para rotas admin, atualizar o campo `role` do usuário no banco para `admin`.

## Documentação da API
- Acessar `http://localhost:3000/docs` após iniciar o servidor.

## Rotas principais
- Auth: `POST /auth/register`, `POST /auth/login`
- Services: `GET /services`, `POST /services`, `PUT /services/:id`, `DELETE /services/:id`
- Appointments: `GET /appointments`, `GET /appointments/:id`, `POST /appointments`, `PUT /appointments/:id`, `DELETE /appointments/:id`

## Diferenciais
- Integração externa via Axios e filas com BullMQ podem ser adicionadas.

