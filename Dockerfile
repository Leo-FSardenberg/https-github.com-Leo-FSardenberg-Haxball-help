# Use uma imagem base adequada para sua aplicação Node.js
FROM node:14-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos package.json e yarn.lock para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências da aplicação
RUN yarn install --production

# Copie os arquivos TypeScript para o diretório de trabalho
COPY src ./src

# Copie o arquivo tsconfig.json para o diretório de trabalho
COPY tsconfig.json .

# Compile a aplicação
RUN yarn build

# Exponha a porta que sua API NestJS está ouvindo (por padrão, é a porta 3000)
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["node", "dist/main"]
