FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build do NestJS
RUN npm run build

# Expõe a porta da API
EXPOSE 3001

# Comando de inicialização
CMD ["node", "dist/main.js"]
