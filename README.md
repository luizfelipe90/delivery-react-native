# L'Italiana - Delivery App

Um aplicativo de delivery completo de culinária italiana, desenvolvido com React Native (Expo) no frontend e Node.js (Express) no backend.

## 📱 Tecnologias Utilizadas

### Frontend (App)
- **React Native & Expo**: Framework principal.
- **Expo Router**: Roteamento por arquivos (semelhante ao Next.js).
- **React Navigation**: Gerenciamento avançado de navegação.
- **TypeScript**: Tipagem estática para maior segurança.
- **Reanimated**: Animações fluidas a 60fps.

### Backend (Servidor)
- **Node.js & Express**: API RESTful ágil e flexível.
- **MySQL2**: Conexão com banco de dados relacional.
- **Autenticação**: `jsonwebtoken` (JWT) para sessões seguras e `bcrypt` para criptografia de senhas.
- **Segurança e Ambiente**: Variáveis de ambiente configuradas com `dotenv` e controle de acesso com `cors`.

### Testes
- **Jest**: Testes unitários focados nas regras de negócio (cálculo de frete, fluxo de autenticação, etc).

## 🗂️ Estrutura do Projeto

O repositório é organizado nas seguintes pastas principais:

- `/italiana_food` - Contém todo o código-fonte do aplicativo mobile (Frontend).
- `/backend` - Contém a API e conexão com o banco de dados.
- `/teste` - Contém a suíte de testes (utilizando Jest) validando regras importantes do sistema.

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para configurar o ambiente de desenvolvimento na sua máquina.

### 1. Clonar o repositório
```bash
git clone https://github.com/luizfelipe90/delivery-react-native.git
cd delivery-react-native
```

### 2. Rodar o Backend
```bash
cd backend
npm install
# Crie seu arquivo .env com base em um possível .env.example (credenciais do DB, JWT secret, etc)
node index.js
```

### 3. Rodar o Aplicativo (Frontend)
Em um novo terminal, abra a pasta do app:
```bash
cd italiana_food
npm install
npm start
# O Expo será iniciado e você poderá testar abrindo no emulador Android/iOS ou lendo o QR code com o app Expo Go.
```

### 4. Rodar os Testes
Para garantir que as regras de negócio estão funcionando perfeitamente:
```bash
# Na pasta principal do projeto
npm install
npm test
```

## 🤝 Contribuição
Sinta-se à vontade para fazer um fork, abrir uma issue ou enviar pull requests com melhorias!
