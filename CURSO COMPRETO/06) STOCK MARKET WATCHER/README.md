# STOCK MARKET WATCHER
Este código mostra como integrar Meteor com uma aplicação que monitora ações (stocks), permite adicionar novas ações, filtrá-las por alteração de preço e atualizá-las automaticamente com dados em tempo real do Yahoo Finance API. Cada parte do código trabalha em conjunto para fornecer uma aplicação de monitoramento de ações dinâmica e interativa.

## Template `addStock`
```javascript
Template.addStock.events({
	'submit #addStock': function(event) {
		event.preventDefault();

		var data = {
			symbol: event.target.querySelector('#symbol').value
		}

		Meteor.call('addStock', data);

		// Limpa o formulário após submeter os dados
		event.target.reset();
	}
});
```

- **`submit #addStock`**: Evento disparado ao submeter o formulário com id `addStock`.
  - `event.target.querySelector('#symbol').value`: Obtém o valor do campo `symbol` do formulário.
  - `Meteor.call('addStock', data)`: Chama o método `addStock` no servidor Meteor com os dados do formulário para adicionar uma nova ação.

## Template `stocks`
```javascript
Template.stocks.helpers({
	stocks: function() {
		var entries;

		// Filtra as ações com base na sessão 'filter'
		if(Session.get('filter') === 'up') {
			entries = Stocks.find({change: {$gt: 0}});
		} else if(Session.get('filter') === 'down') {
			entries = Stocks.find({change: {$lt: 0}});
		} else {
			entries = Stocks.find();
		}

		return entries;
	},
	cssPriceClass: function() {
		var newClass = '';

		// Define a classe CSS com base no valor de 'change'
		if(this.change > 0) {
			newClass = 'price-up';
		} else if(this.change < 0) {
			newClass = 'price-down';
		}

		return newClass;
	}
});
```

- **`stocks`**: Helper que retorna as ações a serem exibidas na interface.
  - Utiliza `Session.get('filter')` para filtrar as ações com base no valor da sessão ('up', 'down' ou nenhum).
- **`cssPriceClass`**: Helper que define a classe CSS para o elemento com base no valor de `change` da ação (`price-up` para valor positivo e `price-down` para valor negativo).

## Eventos do Template `stocks`
```javascript
Template.stocks.events({
	'click .delete': function(event) {
		Meteor.call('deleteStock', this._id); // Chama o método para deletar a ação
	},
	'change #stock-filter': function(event) {
		Session.set('filter', event.target.value); // Define a sessão 'filter' com o valor selecionado
	}
});
```

- **`click .delete`**: Evento disparado ao clicar no elemento com classe `delete` (por exemplo, um botão para deletar uma ação).
  - `Meteor.call('deleteStock', this._id)`: Chama o método `deleteStock` no servidor Meteor para deletar a ação com o ID correspondente.
- **`change #stock-filter`**: Evento disparado ao mudar o valor do elemento com id `stock-filter` (por exemplo, um seletor para filtrar ações).
  - `Session.set('filter', event.target.value)`: Define a sessão 'filter' com o valor selecionado pelo usuário.

## Inicialização no Servidor
```javascript
Meteor.startup(function() {
	// Conta quantas entradas existem na coleção `Stocks`
	var num = Stocks.find().count();

	if (num === 0) {
		// Dados iniciais para a coleção `Stocks`
		var fixtures = [
			{ symbol: 'ASX.AX' },
			{ symbol: 'ANZ.AX' },
			{ symbol: 'BXB.AX' },
			{ symbol: 'WBC.AX' },
			{ symbol: 'IAG.AX' },
			{ symbol: 'CBA.AX' },
			{ symbol: 'BHP.AX' },
			{ symbol: 'GOOO' },
			{ symbol: 'AMZN' },
			{ symbol: 'MSFT' }
		];

		// Insere os dados iniciais na coleção `Stocks`
		fixtures.forEach(function(element) {
			Stocks.insert(element);
		});
	}
});
```

- **`Meteor.startup`**: Executa o código quando o servidor é iniciado.
- Verifica se a coleção `Stocks` está vazia (`num === 0`).
- Insere dados de exemplo na coleção `Stocks` se estiver vazia.

## Atualização Periódica das Ações
```javascript
Meteor.setInterval(function() {
	// Cria um array com os símbolos das ações
	var symbols = [];

	// Itera sobre todas as ações na coleção `Stocks` e adiciona os símbolos ao array `symbols`
	Stocks.find().forEach(function(stock) {
		symbols.push(stock.symbol);
	});

	// Obtém os dados das ações do Yahoo Finance API usando os símbolos coletados
	var results = YahooFinance.snapshot({ symbols: symbols, fields: ['s', 'b'] });

	// Atualiza as entradas na coleção `Stocks` com os dados obtidos do Yahoo Finance API
	results.forEach(function(result) {
		let stock = Stocks.findOne({ symbol: result.symbol });

		if (result.bid) {
			// Calcula a mudança no preço (se disponível)
			let change = stock.price ? result.bid - stock.price : null;

			// Atualiza a entrada na coleção `Stocks` com o novo preço e mudança
			Stocks.update(stock._id, { $set: { price: result.bid, change: change } });
			console.log(result.bid);
		}
	});
}, 5000);
```

- **`Meteor.setInterval`**: Executa a função periodicamente a cada 5 segundos.
- **Criação do Array `symbols`**: Cria um array com os símbolos das ações existentes na coleção `Stocks`.
- **Obtenção de Dados do Yahoo Finance API**: Usa o serviço do Yahoo Finance para obter os dados mais recentes das ações.
- **Atualização da Coleção `Stocks`**: Para cada ação, atualiza o preço e calcula a mudança (se disponível) na coleção `Stocks`.



