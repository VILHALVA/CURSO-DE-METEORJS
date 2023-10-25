# APLICATIVO COMPLETO
Vou lhe mostrar como criar uma aplicação web simples utilizando o framework Meteor. Neste exemplo, criaremos uma aplicação de lista de tarefas, um cenário comum para aprender a desenvolver com o Meteor. Certifique-se de que você tenha o Meteor instalado em seu sistema. Se não tiver, você pode instalá-lo seguindo as instruções no site oficial do Meteor.

Aqui estão os passos para criar uma aplicação de lista de tarefas:

**Passo 1: Crie um novo projeto Meteor**

Abra o terminal e navegue até a pasta onde deseja criar seu projeto. Execute o seguinte comando para criar um novo projeto Meteor chamado "lista-de-tarefas":

```bash
meteor create lista-de-tarefas
```

Isso criará uma estrutura de diretórios e arquivos para seu projeto.

**Passo 2: Acesse o diretório do projeto**

Navegue até o diretório do projeto que você acabou de criar:

```bash
cd lista-de-tarefas
```

**Passo 3: Remova os arquivos de exemplo**

Por padrão, o Meteor cria alguns arquivos de exemplo. Você pode removê-los para começar do zero:

```bash
rm lista-de-tarefas.*
```

**Passo 4: Adicione pacotes necessários**

Para esta aplicação, você precisará do pacote "insecure" para permitir operações de banco de dados no cliente e "autopublish" para publicar dados automaticamente para o cliente. Execute os seguintes comandos para adicioná-los:

```bash
meteor remove insecure
meteor remove autopublish
```

**Passo 5: Crie um modelo para tarefas**

Crie um arquivo JavaScript chamado "tarefas.js" no diretório do projeto e adicione o seguinte código para criar um modelo para tarefas:

```javascript
Tarefas = new Mongo.Collection('tarefas');
```

**Passo 6: Crie templates para a interface do usuário**

Crie um arquivo HTML chamado "lista-de-tarefas.html" no diretório do projeto e adicione o seguinte código para criar templates para a interface do usuário:

```html
<head>
  <title>Lista de Tarefas</title>
</head>

<body>
  <header>
    <h1>Lista de Tarefas</h1>
    <form id="adicionar-tarefa">
      <input type="text" name="texto" placeholder="Adicionar nova tarefa">
    </form>
  </header>

  <ul>
    {{#each tarefas}}
      <li>{{texto}}</li>
    {{/each}}
  </ul>
</body>
```

**Passo 7: Adicione lógica no JavaScript**

Crie um arquivo JavaScript chamado "lista-de-tarefas.js" no diretório do projeto e adicione o seguinte código para adicionar lógica ao seu aplicativo:

```javascript
if (Meteor.isClient) {
  Template.body.helpers({
    tarefas: function () {
      return Tarefas.find({});
    },
  });

  Template.body.events({
    'submit #adicionar-tarefa': function (event) {
      event.preventDefault();
      var texto = event.target.texto.value;
      Tarefas.insert({
        texto: texto,
        criadoEm: new Date(),
      });
      event.target.texto.value = '';
    },
  });
}
```

**Passo 8: Inicie o aplicativo**

Volte para o terminal e execute o seguinte comando para iniciar seu aplicativo:

```bash
meteor
```

Seu aplicativo estará disponível em `http://localhost:3000`. Você terá uma aplicação de lista de tarefas simples, onde pode adicionar novas tarefas que serão exibidas na página. Você pode expandir e personalizar essa aplicação à medida que aprende mais sobre o desenvolvimento com o Meteor.

Esse é apenas um exemplo inicial. Você pode continuar aprimorando a aplicação adicionando recursos como edição e exclusão de tarefas, autenticação de usuários e muito mais, à medida que explora o ecossistema do Meteor. Boa sorte com o desenvolvimento da sua aplicação!