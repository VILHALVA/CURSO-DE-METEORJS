# EXIBIR E FORMATAR O CONTEÚDO DO BANCO DE DADOS
Para exibir e formatar o conteúdo do banco de dados em uma página HTML no Meteor, você pode seguir estas etapas. Vamos usar a coleção de categorias criada anteriormente e o framework CSS Bootstrap para estilizar a página:

**Passo 1: Instalar o Bootstrap**

Primeiro, você precisa garantir que o framework CSS Bootstrap esteja instalado no seu projeto Meteor. Você pode fazer isso executando o seguinte comando na raiz do seu projeto:

```bash
meteor add twbs:bootstrap
```

Isso instalará o Bootstrap no seu projeto.

**Passo 2: Criar um Template HTML**

Agora, crie um arquivo HTML (por exemplo, `conteudo.html`) para definir a estrutura da página onde você exibirá as categorias. Use classes do Bootstrap para estilizar a página:

```html
<head>
  <title>Exibição de Categorias</title>
</head>

<body>
  <div class="container">
    <h1>Categorias</h1>
    <ul class="list-group">
      {{#each categorias}}
        <li class="list-group-item">{{nome}}</li>
      {{/each}}
    </ul>
  </div>
</body>
```

Neste exemplo, estamos usando a classe `list-group` do Bootstrap para criar uma lista de categorias.

**Passo 3: Definir o Template no JavaScript**

Agora, crie um arquivo JavaScript (por exemplo, `conteudo.js`) para definir o template e a lógica de como as categorias serão exibidas na página:

```javascript
import { Template } from 'meteor/templating';
import './conteudo.html';

Template.conteudo.onCreated(function () {
  // Use o nome da coleção 'categorias' definido anteriormente
  this.subscribe('categorias');
});

Template.conteudo.helpers({
  categorias() {
    // Retorna todas as categorias da coleção 'categorias'
    return Categorias.find();
  },
});
```

Observe que estamos usando um template chamado `conteudo` e uma função `onCreated` para garantir que as categorias sejam carregadas. Além disso, estamos definindo um helper `categorias` para buscar as categorias da coleção 'categorias'.

**Passo 4: Publicar as Categorias no Servidor**

Para que as categorias sejam acessíveis no cliente, você precisa publicá-las no servidor. No arquivo JavaScript do servidor, você pode fazer o seguinte:

```javascript
Meteor.publish('categorias', function () {
  return Categorias.find();
});
```

**Passo 5: Rodar o Projeto**

Agora, você pode iniciar o seu projeto Meteor:

```bash
meteor
```

Acesse o projeto em um navegador e você verá a lista de categorias exibida com o estilo do Bootstrap. As categorias são obtidas do banco de dados MongoDB e exibidas na página HTML.

Essas são as etapas para exibir e formatar o conteúdo do banco de dados MongoDB em uma página HTML usando o Meteor e o Bootstrap para aplicar estilos CSS. Lembre-se de ajustar o código conforme as necessidades do seu projeto.