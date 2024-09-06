# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o package.json e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante da aplicação
COPY . .

# Exponha a porta (se necessário para comunicação via API, mas não é obrigatório aqui)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
