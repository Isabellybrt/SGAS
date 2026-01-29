# SGAS - Sistema de Gerenciamento de Agendamentos e Serviços

## Descrição
O **SGAS** é uma plataforma web completa desenvolvida para modernizar e facilitar o gerenciamento de agendamentos e serviços. O sistema oferece uma experiência fluida para usuários finais, permitindo cadastro, visualização e agendamento de serviços, ao mesmo tempo que fornece aos administradores ferramentas robustas para gestão de catálogo e monitoramento.

O projeto foi construído seguindo as melhores práticas de engenharia de software, adotando uma arquitetura **Modular e em Camadas** no backend e uma abordagem baseada em componentes e hooks no frontend, garantindo escalabilidade, manutenibilidade e testabilidade.

---

## Funcionalidades Principais

### Para Usuários
- **Autenticação Segura**: Cadastro e login com proteção via Token JWT.
- **Catálogo de Serviços**: Visualização detalhada dos serviços disponíveis com preços e durações.
- **Agendamento Inteligente**: Interface intuitiva para escolha de datas e horários, com validação de conflitos em tempo real.
- **Meus Agendamentos**: Histórico e gestão dos próprios agendamentos.

### Para Administradores
- **Gestão de Serviços**: CRUD completo (Criar, Ler, Atualizar, Deletar) de serviços.
- **Painel de Controle (Dashboard)**: Visão geral do sistema.
- **Controle de Acesso**: Rotas e ações protegidas por Role-Based Access Control (RBAC).

---

## Arquitetura do Sistema

O projeto é dividido em dois grandes monólitos desacoplados (Frontend e Backend) que se comunicam via API REST.

### 1. Backend (NestJS)
O backend foi migrado para **NestJS**, adotando uma **Arquitetura Modular**.
- **Módulos (`src/modules`)**: O código é organizado por domínios (Auth, Users, Services, Appointments). Cada módulo encapsula sua própria lógica, controladores e provedores.
- **Camada de Serviço (`src/services`)**: Contém puramente a regra de negócio, sem dependência direta de frameworks HTTP ou banco de dados.
- **Repositórios (`src/repositories`)**: Abstração da camada de dados usando **TypeORM**. Permite trocar o banco de dados sem afetar a regra de negócio.
- **DTOs e Validação**: Uso de Data Transfer Objects com `class-validator` para garantir a integridade dos dados antes mesmo de chegarem à regra de negócio.

### 2. Frontend (React + Vite)
O frontend segue uma arquitetura moderna baseada em **React** com **TypeScript**.
- **View (`src/view`)**: Componentes React puramente visuais, estilizados com **Tailwind CSS**.
- **ViewModel (`src/viewmodel`)**: Custom Hooks que gerenciam o estado da tela e a lógica de apresentação, isolando a View da lógica de negócio.
- **Model (`src/model`)**: Definições de Entidades e Serviços de API (Axios), responsáveis pela comunicação com o Backend.
- **Context API**: Gerenciamento de estado global para Autenticação.

---

## Tecnologias Utilizadas

### Backend
- **Node.js & NestJS**: Framework robusto e escalável.
- **TypeScript**: Tipagem estática para maior segurança.
- **PostgreSQL**: Banco de dados relacional robusto.
- **TypeORM**: ORM para manipulação de dados.
- **Redis**: Banco chave-valor para cache e filas (preparado).
- **Swagger**: Documentação viva da API.
- **Jest**: Testes unitários e de integração.
- **Docker**: Containerização dos serviços de infraestrutura.

### Frontend
- **React**: Biblioteca de UI.
- **Vite**: Tooling de nova geração para frontend rápido.
- **TypeScript**: Segurança de tipos.
- **Tailwind CSS**: Estilização utility-first.
- **Axios**: Cliente HTTP.
- **React Router DOM**: Roteamento SPA.

---

## Infraestrutura e Docker

O projeto utiliza **Docker** e **Docker Compose** para orquestrar as dependências externas, garantindo que todos os desenvolvedores tenham exatamente o mesmo ambiente.

### Serviços Containerizados
O arquivo `docker-compose.yml` na raiz define:
1.  **PostgreSQL (`db`)**:
    -   Porta Externa: `6543` (Mapeada para 5432 interna).
    -   Dados persistidos em volume Docker.
2.  **Redis (`redis`)**:
    -   Porta Externa: `6379`.
    -   Utilizado para suporte a cache e futuras implementações de filas.

**Por que usar Docker?**
- Zero configuração manual de banco de dados na máquina host.
- Isolamento de versões e dependências.
- Inicialização de toda a infraestrutura com um único comando.

---

## Testes Automatizados

A qualidade do código é garantida através de testes automatizados.

### Backend (Jest)
- Foco em **Testes Unitários** nos Services.
- **Mocks**: Repositórios são "mockados" para testar a lógica de negócio isoladamente, sem depender do banco de dados estar rodando.
- Cobertura de cenários de sucesso (ex: agendamento criado) e falha (ex: conflito de horário, serviço inexistente).

**Comando para rodar testes:**
```bash
cd backend
npm run test
```

### Frontend
- Estrutura preparada para testes de componentes e hooks em `src/__tests__`.

---

## Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) e Docker Compose
- [Git](https://git-scm.com/)

### Passo 1: Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd TrabalhoFinal
```

### Passo 2: Configuração do Backend
1.  Entre na pasta: `cd backend`
2.  Instale dependências: `npm install`
3.  Configure o `.env`:
    ```env
    PORT=3001
    DATABASE_URL=postgres://app_user:app123@localhost:6543/sgas
    JWT_SECRET=sua_chave_secreta_super_segura
    REDIS_URL=redis://localhost:6379
    ```
    *(Dica: Gere um segredo forte com `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)*

### Passo 3: Configuração do Frontend
1.  Entre na pasta (novo terminal): `cd frontend`
2.  Instale dependências: `npm install`
3.  Configure o `JWT_SECRET` no arquivo `frontend/src/context/AuthContext.tsx` (se aplicável para validação local, embora a segurança real esteja no backend).

---

##  Como Rodar o Projeto

Você precisará de **3 terminais**.

### Terminal 1: Infraestrutura
Na raiz do projeto:
```bash
docker-compose up -d
```
*Aguarde os containers subirem (Postgres na 6543, Redis na 6379).*

### Terminal 2: Backend
Na pasta `backend`:
```bash
npm run start:dev
```
*API rodando em: http://localhost:3001*
*Swagger em: http://localhost:3001/docs*

### Terminal 3: Frontend
Na pasta `frontend`:
```bash
npm run dev
```
*Aplicação rodando em: http://localhost:5173*

---

## Estrutura do Projeto

```plaintext
TrabalhoFinal/
├── docker-compose.yml        # Orquestração (DB, Redis)
├── backend/                  # API NestJS
│   ├── src/
│   │   ├── config/           # Configuração Swagger/Env
│   │   ├── controllers/      # Endpoints da API
│   │   ├── modules/          # Módulos (Auth, Users, Services...)
│   │   ├── services/         # Regras de Negócio
│   │   ├── repositories/     # Acesso a Dados (TypeORM)
│   │   └── entities/         # Modelos do Banco
│   └── test/                 # Testes e2e/unitários
├── frontend/               # Interface do Usuário (React + Vite)
│   ├── src/
│   │   ├── model/          # Regras de Negócio e Dados
│   │   │   ├── entities/   # Tipos e Interfaces (Domínio)
│   │   │   ├── repositories/ # Acesso a Dados (API/Axios)
│   │   │   └── services/   # Lógica de Negócio
│   │   ├── viewmodel/      # Gestão de Estado (Custom Hooks)
│   │   ├── view/           # Interface Visual
│   │   │   ├── pages/      # Telas da aplicação
│   │   │   └── components/ # Componentes reutilizáveis
│   │   └── context/        # Contextos Globais (Auth)
└── README.md                
```

---

## Documentação da API

A API é totalmente documentada com **Swagger**.
Após iniciar o backend, acesse:
👉 **[http://localhost:3001/docs](http://localhost:3001/docs)**

Lá você pode testar todas as rotas diretamente pelo navegador, ver os schemas de dados e exemplos de requisição/resposta.

---

## Destaques de Implementação e Avaliação

Este projeto foi desenvolvido para atender rigorosamente aos critérios de avaliação propostos:

| Critério | Implementação no Projeto |
| :--- | :--- |
| **Adequação ao Tema** | Sistema completo de agendamentos usando **Node.js, NestJS e TypeScript**. Banco de dados **PostgreSQL** e API RESTful. |
| **Arquitetura** | Código organizado em **Módulos, Controllers, Services e Repositories**. Uso de **DTOs** para validação e desacoplamento via Injeção de Dependência. |
| **Implementação Técnica** | **CRUD** completo de serviços e agendamentos. Uso de **TypeORM** para persistência e **Async/Await** em todas as operações de I/O. |
| **Segurança** | Autenticação via **JWT (JSON Web Tokens)**. Senhas criptografadas com **Bcrypt**. Controle de acesso (**RBAC**) via Decorators `@Roles('admin')`. |
| **Funcionamento** | Infraestrutura containerizada (**Docker**) garante execução consistente. Tratamento de erros globais e validação de dados de entrada. |
| **Documentação** | Documentação interativa via **Swagger** e este **README** detalhado cobrindo instalação, arquitetura e uso. |

---

## Licença

Este projeto está licenciado sob a licença **MIT**.

## Autoria

Este projeto foi desenvolvido pela equipe:

- **Maria Isabelly de Brito Rodrigues**
- **Larissa Souza Nascimento**
- **Luís Guilherme Sampaio Fontenele**
- **Vanessa Pereira Cunha**
