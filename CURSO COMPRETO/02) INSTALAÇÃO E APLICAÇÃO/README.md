# INSTALAÇÃO E APLICAÇÃO
**Instalação do Meteor.js:**

Para instalar o Meteor.js no seu sistema, siga estas etapas:

1. **Linux / macOS**:

   Abra o terminal e execute o seguinte comando:

   ```bash
   curl https://install.meteor.com/ | sh
   ```

2. **Windows**:

   Baixe o instalador do [site oficial](https://www.meteor.com/install) e siga as instruções para a instalação.

3. **Verificação da Instalação**:

   Após a instalação, você pode verificar se o Meteor foi instalado com sucesso digitando o seguinte comando no terminal:

   ```bash
   meteor --version
   ```

Agora que você tem o Meteor instalado, vamos criar um exemplo simples de aplicação.

**Exemplo de Aplicação Meteor.js:**

1. Abra o terminal e navegue até a pasta onde deseja criar sua aplicação.

2. Crie um novo aplicativo Meteor com o seguinte comando:

   ```bash
   meteor create minha-aplicacao
   ```

   Isso criará uma estrutura básica de aplicativo na pasta `minha-aplicacao`.

3. Acesse o diretório do aplicativo:

   ```bash
   cd minha-aplicacao
   ```

4. Inicie o aplicativo Meteor:

   ```bash
   meteor
   ```

   Isso iniciará o servidor de desenvolvimento e seu aplicativo estará disponível em `http://localhost:3000` no seu navegador.

5. Agora, você pode fazer alterações no código-fonte da aplicação. Por exemplo, abra o arquivo `minha-aplicacao/client/main.js` e faça uma alteração simples, como:

   ```javascript
   if (Meteor.isClient) {
     console.log("Olá, Meteor!");
   }
   ```

6. Após salvar as alterações, o servidor do Meteor irá recarregar automaticamente o aplicativo, e você verá a mensagem "Olá, Meteor!" no console do navegador.

Este é um exemplo muito simples para começar a explorar o Meteor.js. O Meteor é altamente flexível e pode ser usado para criar aplicativos mais complexos com reatividade em tempo real e recursos avançados.

A partir desse ponto, você pode explorar a documentação [oficial do Meteor.js](https://docs.meteor.com) e outros recursos online para aprender mais sobre o desenvolvimento de aplicativos com Meteor.