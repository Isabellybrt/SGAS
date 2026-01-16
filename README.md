# SGAS - Sistema de Gerenciamento de Agendamentos e Serviços

## Descrição
O SGAS é uma plataforma web completa desenvolvida para facilitar o gerenciamento de agendamentos e serviços. O sistema permite que usuários se cadastrem, visualizem serviços disponíveis e realizem agendamentos de forma intuitiva. O projeto conta com uma arquitetura moderna, separando claramente o Frontend (React/Vite) do Backend (NestJS), e utiliza contêineres Docker para orquestrar o banco de dados e serviços de cache.

## Funcionalidades
- **Autenticação e Autorização**: Cadastro e login de usuários com proteção JWT.
- **Gestão de Serviços**: Visualização e cadastro de serviços oferecidos.
- **Agendamentos**: Criação, edição e cancelamento de agendamentos.
- **Dashboard**: Painel administrativo para visualização rápida de informações.
- **Documentação de API**: Swagger integrado para exploração dos endpoints.

## Tecnologias Utilizadas

### Backend
- **Node.js** com **NestJS**: Framework progressivo para construção de aplicações server-side eficientes.
- **TypeORM**: ORM para interação com o banco de dados.
- **PostgreSQL**: Banco de dados relacional (via Docker).
- **Redis**: Armazenamento de estrutura de dados em memória (via Docker).
- **Swagger**: Documentação automática da API.
- **Jest**: Framework de testes.

### Frontend
- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Build tool rápida e moderna.
- **TypeScript**: Superset JavaScript com tipagem estática.
- **Tailwind CSS**: Framework de utilitários CSS para estilização rápida.
- **Axios**: Cliente HTTP para comunicação com a API.
- **React Router**: Gerenciamento de rotas.

### Infraestrutura
- **Docker** & **Docker Compose**: Orquestração de contêineres para banco de dados e cache.

## Instalação

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Passo 1: Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd TrabalhoFinal
```

### Passo 2: Configuração do Backend
1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente. Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:
   ```env
   PORT=3001
   DATABASE_URL=postgres://app_user:app123@localhost:6543/sgas
   JWT_SECRET=sua_chave_secreta_super_segura
   REDIS_URL=redis://localhost:6379
   ```

### Passo 3: Configuração do Frontend
1. Abra um novo terminal e navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

Para rodar o projeto, você precisará de **três terminais** abertos (ou abas).

### 1. Iniciar Infraestrutura (Docker)
Na raiz do projeto (`TrabalhoFinal`), suba os contêineres do banco de dados e Redis:
```bash
docker-compose up -d
```
*Isso iniciará o PostgreSQL na porta 6543 e o Redis na porta 6379.*

### 2. Iniciar o Backend
No terminal do `backend`:
```bash
npm run start:dev
```
*O servidor iniciará em `http://localhost:3001`.*

### 3. Iniciar o Frontend
No terminal do `frontend`:
```bash
npm run dev
```
*Acesse a aplicação em `http://localhost:5173`.*

## Estrutura do Projeto

```
TrabalhoFinal/
├── backend/                # API e Lógica de Negócios (NestJS)
│   ├── src/
│   │   ├── modules/        # Módulos da aplicação (Auth, Users, Appointments, etc.)
│   │   ├── entities/       # Modelos do Banco de Dados
│   │   └── config/         # Configurações (Swagger, etc.)
│   ├── .env                # Variáveis de ambiente (NÃO COMITAR SENHAS REAIS)
│   └── ...
├── frontend/               # Interface do Usuário (React + Vite)
│   ├── src/
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── components/     # Componentes reutilizáveis
│   │   └── api/            # Configuração do Axios
│   └── ...
└── docker-compose.yml      # Configuração dos serviços Docker (DB e Redis)
```

## Módulos / API

A documentação completa da API (Swagger) pode ser acessada quando o backend estiver rodando em:
**[http://localhost:3001/docs](http://localhost:3001/docs)**

Principais Módulos:
- **Auth**: `/auth/login`, `/auth/register`
- **Users**: `/users`
- **Services**: `/services`
- **Appointments**: `/appointments`

## Testes

Para executar os testes unitários do backend:

```bash
cd backend
npm run test
```

## Licença

Este projeto está licenciado sob a licença MIT.

## Autoria

Desenvolvido por **Isac** e Grupo.
Para dúvidas, entre em contato via e-mail ou issues do repositório.
