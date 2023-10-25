# PROGRAMAÇÃO REATIVA EM AÇÃO
Vou explicar como a programação reativa funciona na prática, especialmente ao criar, atualizar e excluir categorias em um aplicativo Meteor. Neste exemplo, usaremos o MongoDB para armazenar as categorias e demonstraremos a programação reativa, que garante que as mudanças sejam refletidas automaticamente na interface do usuário.

**Criando Categorias:**

Para criar novas categorias de forma reativa, você pode usar um formulário HTML e um evento no Meteor. Primeiro, crie um formulário em um arquivo HTML (por exemplo, `categorias.html`):

```html
<template name="categorias">
  <h1>Gerenciar Categorias</h1>
  <form>
    <input type="text" id="novaCategoria" placeholder="Nova Categoria">
    <button type="submit">Adicionar</button>
  </form>
  <ul>
    {{#each categorias}}
      <li>
        {{nome}}
        <button class="excluir" data-id="{{_id}}">Excluir</button>
      </li>
    {{/each}}
  </ul>
</template>
```

Em seguida, adicione a lógica no arquivo JavaScript (por exemplo, `categorias.js`) para lidar com a criação de categorias:

```javascript
import { Template } from 'meteor/templating';
import './categorias.html';

Template.categorias.helpers({
  categorias() {
    return Categorias.find();
  },
});

Template.categorias.events({
  'submit form'(event) {
    event.preventDefault();
    const novaCategoria = event.target.novaCategoria.value;
    Categorias.insert({ nome: novaCategoria });
    event.target.novaCategoria.value = '';
  },
  'click .excluir'(event) {
    const categoriaId = event.target.getAttribute('data-id');
    Categorias.remove({ _id: categoriaId });
  },
});
```

Neste código, usamos o evento 'submit' para adicionar uma nova categoria à coleção 'Categorias' quando o formulário é enviado e usamos o evento 'click' para excluir uma categoria quando o botão "Excluir" é clicado. A programação reativa entra em ação quando as categorias são adicionadas ou excluídas. Qualquer alteração na coleção 'Categorias' é refletida automaticamente na lista de categorias exibida.

Dessa forma, você cria e exclui categorias de forma reativa, e a interface do usuário é atualizada sem a necessidade de recarregar a página.

**Nota**: Lembre-se de que este é apenas um exemplo simples para demonstrar a programação reativa. Em um aplicativo real, você deve considerar medidas de segurança e autenticação ao lidar com adições e exclusões de dados.