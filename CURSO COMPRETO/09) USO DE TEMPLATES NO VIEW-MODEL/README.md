# USO DE TEMPLATES NO VIEW-MODEL
Continuando a desenvolver sua aplicação e aprofundando-se no padrão MVVM no Meteor, você pode criar templates que permitam adicionar itens às categorias, visualizá-los, editá-los e excluí-los. Vou explicar como você pode implementar esses recursos em seu aplicativo:

**Passo 1: Criar um Template HTML para Itens**

Primeiro, crie um novo template HTML em um arquivo, por exemplo, `itens.html`:

```html
<template name="itens">
  <h2>Itens</h2>
  <button id="adicionarItemBtn">Adicionar Item</button>
  {{#if showItemForm}}
    <form id="itemForm">
      <input type="text" id="novoItem" placeholder="Nome do Item">
      <button type="submit">Adicionar</button>
    </form>
  {{/if}}
  <ul>
    {{#each itens}}
      <li>
        {{nome}}
        <button class="editar" data-id="{{_id}}">Editar</button>
        <button class="excluir" data-id="{{_id}}">Excluir</button>
      </li>
    {{/each}}
  </ul>
</template>
```

Neste template, criamos um botão "Adicionar Item" e um formulário para adicionar novos itens. Além disso, exibimos uma lista de itens que podem ser editados ou excluídos.

**Passo 2: Atualizar o ViewModel em JavaScript**

Agora, atualize o ViewModel no arquivo JavaScript, por exemplo, `itens.js`:

```javascript
import { Template } from 'meteor/templating';

Template.itens.onCreated(function () {
  this.showItemForm = new ReactiveVar(false);
});

Template.itens.helpers({
  itens() {
    return Itens.find();
  },
});

Template.itens.events({
  'click #adicionarItemBtn'(event, instance) {
    instance.showItemForm.set(true);
  },
  'submit #itemForm'(event, instance) {
    event.preventDefault();
    const novoItem = event.target.novoItem.value;
    Itens.insert({ nome: novoItem });
    event.target.novoItem.value = '';
    instance.showItemForm.set(false);
  },
  'click .excluir'(event) {
    const itemId = event.target.getAttribute('data-id');
    Itens.remove({ _id: itemId });
  },
  'click .editar'(event) {
    const itemId = event.target.getAttribute('data-id');
    // Implementar a funcionalidade de edição aqui
  },
});
```

Neste código, estamos usando o ViewModel para controlar o estado da variável `showItemForm`, que determina se o formulário para adicionar itens é visível ou não. Além disso, implementamos a funcionalidade para adicionar itens e excluir itens. Para a funcionalidade de edição, você pode implementá-la conforme necessário.

Agora, seu aplicativo permite adicionar itens, visualizá-los, editá-los e excluí-los. Lembre-se de que a funcionalidade de edição deve ser implementada conforme as necessidades do seu aplicativo. Com o padrão MVVM e o uso de templates no Meteor, você pode criar interfaces de usuário reativas e dinâmicas de forma organizada e eficiente.