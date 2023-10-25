# USO DE TEMPLATES COM VIEWMODEL
Usar templates com ViewModel no Meteor é uma prática comum para criar interfaces de usuário reativas e dinâmicas. Aqui estão alguns exemplos práticos que demonstram como usar templates em JavaScript no lado do cliente para estender um projeto existente no Meteor. Neste exemplo, vamos incluir um botão que ativa um campo de texto para adicionar novas categorias a uma coleção.

**Passo 1: Criar um Template HTML**

Comece criando um novo template HTML para a interface do usuário em um arquivo, por exemplo, `categorias.html`:

```html
<template name="categorias">
  <h1>Gerenciar Categorias</h1>
  <button id="adicionarCategoriaBtn">Adicionar Categoria</button>
  {{#if showInput}}
    <input type="text" id="novaCategoria" placeholder="Nova Categoria">
    <button id="salvarCategoria">Salvar</button>
  {{/if}}
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

Neste exemplo, criamos um botão "Adicionar Categoria" e um campo de texto para adicionar novas categorias, mas o campo de texto está oculto inicialmente. Isso é controlado pela variável `showInput` que será definida no ViewModel.

**Passo 2: Criar o ViewModel em JavaScript**

Agora, crie o ViewModel no lado do cliente em um arquivo JavaScript, por exemplo, `categorias.js`:

```javascript
import { Template } from 'meteor/templating';

Template.categorias.onCreated(function () {
  this.showInput = new ReactiveVar(false);
});

Template.categorias.helpers({
  categorias() {
    return Categorias.find();
  },
});

Template.categorias.events({
  'click #adicionarCategoriaBtn'(event, instance) {
    instance.showInput.set(true);
  },
  'click #salvarCategoria'(event, instance) {
    const novaCategoria = instance.find('#novaCategoria').value;
    Categorias.insert({ nome: novaCategoria });
    instance.find('#novaCategoria').value = '';
    instance.showInput.set(false);
  },
  'click .excluir'(event) {
    const categoriaId = event.target.getAttribute('data-id');
    Categorias.remove({ _id: categoriaId });
  },
});
```

Neste código, usamos o ViewModel para controlar o estado da variável `showInput`, que determina se o campo de texto para adicionar uma nova categoria é visível ou não. O botão "Adicionar Categoria" ativa e desativa a exibição do campo de texto.

**Passo 3: Executar o Aplicativo**

Após criar o template e o ViewModel, execute o aplicativo Meteor:

```bash
meteor
```

Acesse o aplicativo no navegador e você verá a interface do usuário que permite adicionar novas categorias clicando no botão "Adicionar Categoria".

Esses exemplos demonstram como usar templates em JavaScript no Meteor para criar interfaces de usuário reativas e interativas. O ViewModel controla o comportamento do template, permitindo a exibição dinâmica de elementos, como o campo de texto para adicionar novas categorias. Isso cria uma experiência de usuário mais flexível e amigável.