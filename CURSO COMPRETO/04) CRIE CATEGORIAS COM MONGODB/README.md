# CRIE CATEGORIAS COM MONGODB
Vou explicar como criar categorias com o MongoDB em um aplicativo Meteor, e também como adicionar categorias e itens através do navegador ou da aplicação.

**Definir uma Coleção:**

No Meteor, você pode definir uma coleção para armazenar as categorias em um arquivo JavaScript da sua aplicação. Por exemplo, crie um arquivo chamado `categorias.js`:

```javascript
Categorias = new Mongo.Collection('categorias');
```

Isso cria uma coleção chamada 'categorias' no banco de dados MongoDB associado à sua aplicação.

**Adicionar Categorias:**

Você pode adicionar categorias diretamente do console do navegador ou através da sua aplicação. Para adicionar categorias a partir do console do navegador, abra o console no seu navegador (F12 ou clique com o botão direito na página, "Inspecionar", e depois vá para a guia "Console"). Você pode então executar comandos como este:

```javascript
Categorias.insert({ nome: 'Eletrônicos' });
Categorias.insert({ nome: 'Roupas' });
```

Isso adicionará duas categorias à coleção 'categorias'.

**Acessar Categorias:**

Para acessar as categorias a partir do console ou da sua aplicação, você pode executar consultas na coleção. Por exemplo, a partir do console do navegador:

```javascript
const categorias = Categorias.find().fetch();
console.log(categorias);
```

Isso recuperará todas as categorias da coleção e as mostrará no console.

**Adicionar Itens às Categorias:**

Você pode adicionar itens às categorias criando uma coleção separada para os itens e relacionando-os com as categorias. Por exemplo, você pode criar uma coleção chamada 'itens' e adicionar itens relacionados às categorias através do console ou da aplicação.

```javascript
Itens = new Mongo.Collection('itens');

// Adicionar itens relacionados às categorias
Itens.insert({ nome: 'Notebook', categoriaId: 'ID da categoria' });
Itens.insert({ nome: 'Camiseta', categoriaId: 'ID da categoria' });
```

Estes passos permitem que você crie categorias e itens relacionados em seu aplicativo Meteor e acesse-os a partir do console do navegador ou do código do aplicativo. Lembre-se de personalizar os detalhes de acordo com as necessidades específicas do seu aplicativo.