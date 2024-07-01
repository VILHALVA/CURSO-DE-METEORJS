# MESSAGE BOARD
Este código define uma aplicação simples de quadro de mensagens com Meteor. Os usuários podem enviar novas mensagens que são armazenadas no banco de dados e exibidas em uma lista. As mensagens são vinculadas ao usuário que as enviou e exibem a data formatada.

## Estrutura Básica da Página
```html
<head>
  <title>message-board</title>
</head>

<body>
  <div class="container">
      <div class="row">
        <div class="col-xs-12">
          {{  > loginButtons }}
          <h1>Message Board</h1>
        </div>
      </div>
    {{ > newEntry }}
    <br>
    {{ > listing  }}
  </div>
</body>
```

**Explicação:**

- **Cabeçalho da Página**: Define o título da página como "message-board".
- **Corpo da Página**:
  - **Container Principal**: Um `div` com a classe `container` que contém toda a estrutura da aplicação.
  - **Login e Título**: Exibe os botões de login (`{{ > loginButtons }}`) e o título "Message Board".
  - **Formulário de Nova Entrada**: Insere o template `newEntry`, que contém o formulário para enviar uma nova mensagem.
  - **Listagem de Mensagens**: Insere o template `listing`, que exibe a lista de mensagens.

## Template `newEntry`
```html
<template name="newEntry">
  <div class="row">
    <div class="col-xs-12">
      <form id="entryForm">
        <div class="form group">
          <textarea id="content" class="form-control" placeholder="Your Message"></textarea>
        </div>
        <br>
        <div class="form group">
          <button type="submit" class="btn btn-success btn-lg btn-block">Save</button>
        </div>
      </form> 
    </div>
  </div>
</template>
```

**Explicação:**

- **Formulário de Nova Mensagem**: Um formulário para enviar uma nova mensagem.
  - **Textarea**: Campo para o usuário digitar sua mensagem.
  - **Botão Salvar**: Botão para enviar o formulário.

## Template `listing`
```html
<template name="listing">
  <div class="row">
    <div class="col-xs-12">
      <ul class="list-group">
        {{#each entries}}
          <li class="list-group-item">{{content}} - {{formattedDate}}</li>
        {{/each}}
      </ul>
    </div>
  </div>
</template>
```

**Explicação:**

- **Listagem de Mensagens**: Um `ul` que contém uma lista de mensagens.
  - **Iteração `entries`**: Itera sobre a coleção `entries` e exibe cada mensagem.
  - **Mensagem e Data**: Cada item de lista (`li`) exibe o conteúdo da mensagem e a data formatada.

### Helpers do Template `listing`

```javascript
Template.listing.helpers({
	entries: function() {
		return Messages.find();
	},
	formattedDate: function() {
		return this.date ? moment(this.date).format("ddd, hA h:mm:ss") : '';
	}
});
```

**Explicação:**

- **`entries`**: Retorna todos os documentos da coleção `Messages`.
- **`formattedDate`**: Formata a data da mensagem usando a biblioteca Moment.js.

## Eventos do Template `newEntry`
```javascript
Template.newEntry.events({
	'submit #entryForm': function(event){
		event.preventDefault();

		var c = $('#content').val();
		Meteor.call('addMessage', {content: c})
		$('#content').val('');
	}
});
```

**Explicação:**

- **`submit #entryForm`**: Evento que ocorre quando o formulário é enviado.
  - **`event.preventDefault()`**: Previne o comportamento padrão do formulário (que seria recarregar a página).
  - **Obtém o Conteúdo**: Obtém o valor do campo `textarea`.
  - **Chama o Método `addMessage`**: Chama o método do servidor `addMessage` para inserir a mensagem no banco de dados.
  - **Limpa o Campo**: Limpa o campo `textarea` após o envio.

## Código do Servidor
```javascript
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Código para rodar no servidor ao iniciar

  Meteor.methods({
  	addMessage: function(messageData) {
  		if (!Meteor.userId()) {
  			throw new Meteor.Error('no-authorized');
  		}

  		if (!messageData.content) {
  			throw new Meteor.Error('invalid');
  		}

  		messageData.date = new Date();
  		messageData.owner = Meteor.userId();

  		Messages.insert(messageData);
  	}
  });
});
```

**Explicação:**

- **`Meteor.startup`**: Código que é executado quando o servidor é iniciado.
- **Método `addMessage`**: Método do servidor que adiciona uma nova mensagem.
  - **Verificação de Autorização**: Verifica se o usuário está logado.
  - **Verificação de Conteúdo**: Verifica se a mensagem tem conteúdo.
  - **Adiciona Data e Proprietário**: Adiciona a data atual e o ID do usuário à mensagem.
  - **Insere a Mensagem**: Insere a mensagem na coleção `Messages`.



