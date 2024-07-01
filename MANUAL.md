# MANUAL
## INSTALAÇÃO GLOBAL:
### [TRABALHANDO COM O `VOLTA`:](https://volta.sh/)
Usar o Volta pode ajudar a resolver problemas de incompatibilidade com o Node.js. Volta é um gerenciador de versões do Node.js que permite instalar e usar diferentes versões do Node.js em um ambiente de desenvolvimento, garantindo que você possa trabalhar com a versão específica necessária para seu projeto.

Ao usar o Volta, você pode facilmente alternar entre versões do Node.js em diferentes projetos ou até mesmo dentro do mesmo projeto, garantindo que cada um use a versão específica compatível com as dependências.

Aqui estão os passos básicos para instalar e usar o Volta:

1. **Instalação do Volta**:
   - Você pode instalar o Volta seguindo as instruções do site oficial: [Volta.sh](https://volta.sh/).
   - Geralmente, ela é feita com um único comando, que pode variar dependendo do seu sistema operacional.

2. **Instalação do Node.js com o Volta**:
   - Após instala-lo, você pode usar o comando `volta install node@<version>` para instalar uma versão específica do Node.js.
   - Por exemplo, para instalar o Node.js na versão 14.x, você pode executar:
   ```bash
   volta install node@14
   ```

3. **Usando o Node.js com o Volta**:
   - Depois de instalar o Node.js desejado com o Volta, você pode definir a versão específica do Node.js para um projeto usando o comando dentro do diretório do projeto:
   ```bash
   volta pin node@14
   ```
   - Isso garantirá que o Node.js especificado pelo Volta seja usado ao executar comandos relacionados ao Node.js dentro desse projeto.

Usando o Volta, você pode gerenciar facilmente as versões do Node.js e garantir a compatibilidade com suas aplicações Meteor.js e outras dependências do projeto.

### TRABALHANDO COM `nvm`:
1. **Instalar o `nvm` para Windows**:
   - Baixe o instalador do `nvm` para Windows no [repositório do GitHub do `nvm` para Windows](https://github.com/coreybutler/nvm-windows/releases).
   - Baixe o arquivo `nvm-setup.zip`, extraia o conteúdo e execute o `nvm-setup.exe` para instalar.

2. **Instalar uma Versão Específica do Node.js com `nvm`**:
   - Abra o Prompt de Comando e verifique se o `nvm` foi instalado corretamente:
     ```bash
     nvm --version
     ```
   - Instale a versão 14 do Node.js:
     ```bash
     nvm install 14
     ```
   - Use a versão instalada do Node.js:
     ```bash
     nvm use 14
     ```

3. **Verificar a Versão do Node.js e npm**:
   - Verifique se a versão correta do Node.js está ativa:
     ```bash
     node --version
     ```
   - Verifique a versão do `npm`:
     ```bash
     npm --version
     ```

4. **Instalar o Meteor**:
   - Instale o Meteor usando o comando de instalação padrão:
     ```bash
     npm install -g meteor
     ```
   - Verifique se o Meteor foi instalado corretamente:
     ```bash
     meteor --version
     ```

5. **Criar e Executar um Projeto Meteor**:
   - Crie um novo projeto Meteor:
     ```bash
     meteor create nome-do-seu-projeto
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd nome-do-seu-projeto
     ```
   - Execute o projeto Meteor:
     ```bash
     meteor
     ```

### REMOVER O VOLTA (OPCIONAL):
Se preferir remover o Volta para evitar conflitos, você pode desinstalar o Volta executando:
```bash
volta uninstall
```

Após seguir estes passos, você deve conseguir criar e executar projetos Meteor sem problemas de compatibilidade com a versão do Node.js.

### [INSTALAÇÃO DO METEOR.JS:](https://www.meteor.com/install)
1. **Instale o Meteor.js**:
  - Abra um CMD/Terminal e execute o seguinte comando:
    ```bash
    npm install -g meteor
    ```

2. **Verifique se o Meteor foi instalado corretamente**:
   - Para exibir a versão instalada do Meteor.js digite:
   ```bash
    meteor --version
    ```

## INSTALAÇÃO LOCAL:
Aqui está um exemplo completo de como configurar e rodar um projeto MeteorJS localmente:

1. Crie um diretório para o seu projeto e navegue até ele:
   ```sh
   mkdir my-meteor-project
   cd my-meteor-project
   ```

2. Instale o MeteorJS localmente:
   ```sh
   npm install meteor --save-dev
   ```

3. Verifique a instalação do MeteorJS:
   ```sh
   npx meteor --version
   ```

4. Crie um novo projeto MeteorJS:
   ```sh
   npx create-meteor-app my-app
   cd my-app
   ```

5. Inicie o servidor do MeteorJS:
   ```sh
   npx meteor
   ```

Seguindo esses passos, você pode usar o MeteorJS localmente no seu projeto sem a necessidade de uma instalação global no sistema. Isso também facilita a gestão de dependências e versões específicas para cada projeto.

## CRIANDO UM NOVO PROJETO:
1. **Crie um novo projeto Meteor**:
   - Abra um terminal ou prompt de comando.
   - Navegue até o diretório onde você deseja criar seu projeto.
   - Execute o seguinte comando para criar um novo projeto Meteor:
     ```
     meteor create nome-do-seu-projeto
     ```

2. **Navegue para o diretório do projeto**:
   - Mude para o diretório do seu projeto usando `cd nome-do-seu-projeto`.

## SUBINDO O SERVIDOR:
1. **Inicialize o servidor Meteor**:
   - Dentro do diretório do seu projeto, execute o seguinte comando para iniciar o servidor Meteor:
     ```
     meteor
     ```

2. **Acesse seu aplicativo no navegador**:
   - Após iniciar o servidor, abra seu navegador da web e acesse `http://localhost:3000`. Você deve ver a página inicial padrão do seu aplicativo Meteor.

3. **Explorando o aplicativo padrão**:
   - O projeto padrão criado pelo Meteor.js inclui alguns arquivos de exemplo. Você pode explorar esses arquivos para entender a estrutura básica.

## CODIGO DE EXEMPLO:
Aqui está um exemplo simples de um aplicativo Meteor.js que exibe uma lista de tarefas:

1. **HTML (`main.html`)**:

```html
<head>
  <title>Lista de Tarefas</title>
</head>

<body>
  <header>
    <h1>Lista de Tarefas</h1>
    <form class="new-task">
      <input type="text" name="text" placeholder="Digite uma nova tarefa..." />
    </form>
  </header>

  <ul>
    {{#each tasks}}
      {{> task}}
    {{/each}}
  </ul>
</body>

<template name="task">
  <li>{{text}}</li>
</template>
```

2. **JavaScript (`main.js`)**:

```javascript
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, { sort: { createdAt: -1 } });
    },
  });

  Template.body.events({
    "submit .new-task": function(event) {
      var text = event.target.text.value;

      Tasks.insert({
        text: text,
        createdAt: new Date(),
      });

      event.target.text.value = "";
      return false;
    },
  });
}
```

3. **CSS (`main.css`)**:

```css
body {
  font-family: sans-serif;
}

form {
  padding: 20px;
  background: #f9f9f9;
  border-bottom: 1px solid #eaeaea;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #eaeaea;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
```

Este é um exemplo muito simples de um aplicativo Meteor.js que permite adicionar e exibir tarefas. Ele inclui um formulário para adicionar novas tarefas e exibe as tarefas existentes em uma lista não ordenada.

## DIRETÓRIOS:
### ESTRUTURA DO PROJETO:
```
.
├── client
│   ├── main.html
│   ├── main.js
│   └── main.css
└── server
    └── main.js
```

### EXPLICAÇÃO DA ESTRUTURA:
- **`client/`**: Este diretório contém todos os arquivos que são carregados no lado do cliente (navegador). Aqui, temos:
  - **`main.html`**: Este arquivo contém a estrutura HTML da aplicação. Ele inclui a definição da página inicial, o cabeçalho com um formulário para adicionar novas tarefas e uma lista para exibir as tarefas existentes.
  - **`main.js`**: Este arquivo contém o código JavaScript que é executado no lado do cliente. Ele inclui a definição de templates Blaze (usados para renderizar tarefas na lista) e eventos relacionados ao formulário para adicionar novas tarefas.
  - **`main.css`**: Este arquivo contém estilos CSS para estilizar a aplicação.

- **`server/`**: Este diretório contém os arquivos que são carregados apenas no lado do servidor. Aqui, temos:
  - **`main.js`**: Este arquivo contém o código JavaScript que é executado apenas no lado do servidor. Neste exemplo, não há nada nele, mas é comum colocar o código do servidor em arquivos aqui para separar as preocupações entre o cliente e o servidor.

Esta é uma estrutura básica que segue as convenções padrão do Meteor.js. O código no diretório `client/` é enviado e executado no navegador do cliente, enquanto o código no diretório `server/` é executado apenas no servidor. Isso ajuda a manter uma arquitetura limpa e organizada para o seu aplicativo Meteor.js.

