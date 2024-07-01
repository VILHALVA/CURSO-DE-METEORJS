# MONGO EXAMPLE
Este código define uma aplicação simples que utiliza Meteor e MongoDB para gerenciar vendas. Ele inclui uma página básica que exibe uma tabela com informações das vendas, utilizando filtros e opções de consulta para manipular os dados exibidos.

## Estrutura Básica da Página
```html
<head>
  <title>mongo-example</title>
</head>

<body>
  <h1>Sales</h1>

  {{ > sales }}
</body>
```

**Explicação:**

- **Cabeçalho da Página**: Define o título da página como "mongo-example".
- **Corpo da Página**:
  - **Título**: Exibe o título "Sales".
  - **Inclui Template `sales`**: Renderiza o template `sales`, que exibe a tabela de vendas.

## Template `sales`
```html
<template name="sales">
    <table>
      <tr>
        <th>ID</th>
        <th>qty</th>
        <th>total</th>
        <th>products</th>
      </tr>
      {{#each sales}}
        <tr>
          <td>{{_id}}</td>
          <td>{{qty}}</td>
          <td>{{total}}</td>
          <td>{{products}}</td>
        </tr>
      {{/each}}
    </table>
</template>
```

**Explicação:**

- **Tabela de Vendas**: Exibe uma tabela com informações das vendas.
  - **Cabeçalho da Tabela**: Define as colunas da tabela.
  - **Iteração `sales`**: Para cada venda encontrada na coleção `Sales`, exibe uma linha na tabela com os campos `_id`, `qty`, `total` e `products`.

## Helpers do Template `sales`
```javascript
Template.sales.helpers({
	'sales' : function() {
		return Sales.find({
			products: {$in: ['purple', 'orange']}, 
			qty: {$gt: 10}
		},
		{
			sort: [['qty', 'asc'], ['_id', 'desc']],
			limit: 10,
			fields: {qty : 0, products: 0},
			skip: 7
		}
		);
	}
});
```

**Explicação:**

- **Helper `sales`**: Define um helper para o template `sales`.
  - **Filtragem**: Utiliza `Sales.find()` para buscar documentos na coleção `Sales` que atendam aos seguintes critérios:
    - `products: {$in: ['purple', 'orange']}`: O campo `products` contém as strings "purple" ou "orange".
    - `qty: {$gt: 10}`: O campo `qty` é maior que 10.
  - **Opções de Consulta**:
    - **`sort`**: Ordena os resultados primeiro por `qty` em ordem ascendente e depois por `_id` em ordem descendente.
    - **`limit`**: Limita o número de documentos retornados para 10.
    - **`fields`**: Exclui os campos `qty` e `products` dos resultados retornados.
    - **`skip`**: Pula os primeiros 7 documentos que correspondem aos critérios de filtragem.

## Código do Servidor
```javascript
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // Código para rodar no servidor ao iniciar

  var num = Sales.find().count();

  if (num === 0){
  	var qty, prodIndex;
  	var productOptions = ['red', 'green', 'orange', 'purple', 'blue', 'white'];
  	for(var i = 0; i < 400; ++i) {

  		qty = Math.ceil(1 + Math.random() * 20);
  		prodIndex = Math.floor(Math.random() + productOptions.length);

  		Sales.insert({
  			qty: qty,
  			total: 100 * qty,
  			time: new Date(),
  			products: productOptions.slice(0, prodIndex)
  		});
  	} 
  }
});
```

**Explicação:**

- **`Meteor.startup`**: Código que é executado quando o servidor é iniciado.
- **Inicialização dos Dados**: Verifica se não há nenhum documento na coleção `Sales`.
  - **Geração de Dados**: Se não houver documentos, gera 400 registros de vendas aleatórios.
    - `qty`: Quantidade aleatória de produtos vendidos.
    - `total`: Total calculado baseado na quantidade (`qty`).
    - `time`: Data atual.
    - `products`: Seleciona aleatoriamente um subconjunto de opções de produtos.


