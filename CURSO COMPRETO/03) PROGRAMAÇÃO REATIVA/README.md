# PROGRAMAÇÃO REATIVA
## CONCEITO:
Permite que seu aplicativo seja atualizado automaticamente sempre que ocorrerem alterações em seus dados ou código, sem a necessidade de recarregar a página ou reiniciar o servidor. Isso oferece uma experiência em tempo real aos usuários e é uma das características mais interessantes do Meteor.

Aqui está uma explicação mais detalhada de como a programação reativa funciona em Meteor:

1. **Acesso a Diretórios e Arquivos**: No início, você aprende como acessar os diretórios e arquivos que foram instalados com o Meteor. O Meteor tem uma estrutura de projeto específica, e é importante conhecer os diretórios e arquivos para organizar seu código corretamente.

2. **Aplicação de Exemplo**: Você continua trabalhando com a aplicação de exemplo que foi instalada em um tutorial anterior. Essa aplicação já possui código básico que pode ser alterado para demonstrar a programação reativa.

3. **Introdução de Mudanças**: Ao fazer alterações no código, como adicionar ou modificar dados, o Meteor detecta imediatamente essas alterações. Isso é possível devido à programação reativa. O Meteor rastreia todas as dependências de seus dados e código.

4. **Transmissão de Alterações**: Quando ocorre uma alteração, o Meteor atualiza automaticamente a parte relevante da aplicação sem a necessidade de recarregar a página. Isso inclui atualizações no servidor e no cliente, permitindo que os dados sejam sincronizados em tempo real.

5. **Sem Necessidade de Reiniciar o Servidor ou Atualizar o Navegador**: Uma característica poderosa da programação reativa do Meteor é que você não precisa reiniciar o servidor ou atualizar o navegador para ver as alterações. Isso acelera o desenvolvimento e torna as atualizações em tempo real uma realidade.

Essa capacidade de programação reativa é o que torna o Meteor uma escolha popular para aplicativos em tempo real, como chats, painéis de controle em tempo real e colaboração online. É uma das razões pelas quais o Meteor é conhecido por sua facilidade de desenvolvimento de aplicativos em tempo real e sua produtividade.

Ao explorar e trabalhar com o Meteor, você descobrirá como aproveitar ao máximo a programação reativa para criar aplicativos altamente responsivos e dinâmicos.

## EXEMPLO:
Vou fornecer um exemplo simples de código Meteor.js que demonstra a programação reativa. Neste exemplo, criaremos um contador que é atualizado automaticamente na interface do usuário sempre que o valor do contador é alterado. 

1. Comece criando um novo projeto Meteor ou use um projeto existente.

2. Crie um arquivo HTML (por exemplo, `contador.html`) e insira o seguinte código:

```html
<head>
  <title>Exemplo de Contador Reactivo</title>
</head>

<body>
  <h1>Contador:</h1>
  <p id="contador">0</p>
  <button id="aumentar">Aumentar</button>
</body>
```

3. Agora, crie um arquivo JavaScript (por exemplo, `contador.js`) para implementar a lógica do contador:

```javascript
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './contador.html';

Template.body.onCreated(function () {
  // Use uma variável reativa para armazenar o valor do contador
  this.contador = new ReactiveVar(0);
});

Template.body.events({
  'click #aumentar'(event, instance) {
    // Aumenta o valor do contador quando o botão é clicado
    const contadorAtual = instance.contador.get();
    instance.contador.set(contadorAtual + 1);
  },
});

Template.body.helpers({
  // Use um helper para acessar o valor reativo do contador
  contador() {
    return Template.instance().contador.get();
  },
});
```

4. Agora, para testar o aplicativo, execute o Meteor com o seguinte comando no terminal:

```bash
meteor
```

5. Abra seu navegador e acesse `http://localhost:3000`. Você verá a interface do usuário com o contador inicializado como 0. Quando você clicar no botão "Aumentar", o valor do contador será atualizado automaticamente na página sem a necessidade de recarregá-la.

Esse é um exemplo simples que demonstra a programação reativa no Meteor. Quando você altera o valor do contador, o Meteor automaticamente atualiza a interface do usuário para refletir essa mudança, sem a necessidade de atualizações manuais. Isso é uma parte fundamental da programação reativa no Meteor e torna a criação de aplicativos em tempo real mais eficiente.