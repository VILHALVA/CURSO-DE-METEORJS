# PHASER REALTIME
Este código combina Meteor e Phaser para criar um jogo simples onde os objetos (sprites) podem ser arrastados na tela e suas posições são sincronizadas em tempo real com o banco de dados MongoDB através do uso do `Tracker.autorun`. Isso permite que múltiplos clientes vejam e interajam com os mesmos objetos em tempo real.

## Explicação do Código
### Configuração Inicial do Jogo com Phaser
```javascript
Meteor.startup(function(){
	var game = new Phaser.Game(360, 640, Phaser.AUTO);
	game.state.add('Game', GameState);
	game.state.start('Game');
});
```

- **`Meteor.startup`**: Inicia o jogo Phaser quando o servidor Meteor é iniciado.
- **`Phaser.Game`**: Cria uma instância do jogo Phaser com largura de 360 pixels e altura de 640 pixels usando `Phaser.AUTO` para detectar a melhor renderização automática disponível.
- **`game.state.add` e `game.state.start`**: Adiciona e inicia o estado `Game` definido em `GameState`.

### Definição do Estado `GameState`
```javascript
var GameState = {
	init: function() {
		// Opções de escalonamento
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		// Limite de movimento (pixels)
		this.MOVEMENT_LIMIT = 5;
	},
	preload: function() {
		// Carrega as imagens necessárias
		this.load.image('backyard', 'images/backyard.jpg');
		this.load.image('duck', 'images/rsz_duck.png');
		this.load.image('candy', 'images/rsz_candy.png');
		this.load.image('apple', 'images/rsz_apple.png');
	},
	create: function() {
		// Cria o fundo do jogo
		this.background = this.add.sprite(0, 0, 'backyard');
		this.items = this.add.group(); // Grupo para os itens no jogo

		var state = this;

		// Monitora as mudanças nos dados do banco de dados usando Tracker.autorun
		Tracker.autorun(function() {
			let positions = Positions.find(); // Encontra todas as posições no banco de dados
			console.log('number of items ' + positions.count());

			positions.forEach(function(pos) {
				let id = pos._id._str ? pos._id._str : pos._id;

				// Filtra os itens já criados para atualizar sua posição ou criar novos sprites
				let item = state.items.filter(function(element) {
					return element._id == id;
				});

				item = item.list[0]; // Obtém o primeiro elemento (deve ser único)

				if (!item) {
					// Cria um novo sprite se não existir
					item = state.items.create(pos.x, pos.y, pos.asset);
					item._id = id;
					item._idOriginal = pos._id;
					item.inputEnabled = true;
					item.input.enableDrag(); // Permite arrastar o item na tela
				} else {
					// Atualiza a posição do sprite existente
					item.x = pos.x;
					item.y = pos.y;
				}
			});
		});
	},
	update: function() {
		// Atualiza a posição dos itens no banco de dados quando arrastados
		this.items.forEach(function(item) {
			// Inicializa a posição anterior se não existir
			if (!item.previousPosition) {
				item.previousPosition = {x: item.x, y: item.y};
			} else if (item.input.isDragged && (Phaser.Point.distance(item.position, item.previousPosition) > this.MOVEMENT_LIMIT)) {
				// Atualiza o banco de dados com a nova posição se movido além do limite definido
				Positions.update(item._idOriginal, {$set: {x: item.x, y: item.y}});
			}
		}, this);
	}
};
```

- **`init`**: Configurações iniciais do jogo, como modo de escalonamento e limites de movimento.
- **`preload`**: Carrega as imagens necessárias para os sprites.
- **`create`**: Cria os elementos visuais do jogo, como o fundo e o grupo de itens.
  - **`Tracker.autorun`**: Monitora as alterações na coleção `Positions` no banco de dados.
  - **`Positions.find()`**: Recupera todas as posições salvas no banco de dados.
  - **`forEach`**: Itera sobre cada posição encontrada.
  - **`state.items.filter`**: Filtra os sprites existentes para verificar se um sprite já foi criado para cada posição no banco de dados.
  - **Criação de Sprites**: Cria um novo sprite se ele não existir ou atualiza a posição do sprite existente.
- **`update`**: Atualizações contínuas durante o jogo.
  - **`this.items.forEach`**: Itera sobre todos os itens (sprites) no grupo `items`.
  - **`item.input.isDragged`**: Verifica se o item está sendo arrastado pelo usuário.
  - **`Positions.update`**: Atualiza a posição no banco de dados se o item for movido além do limite definido (`MOVEMENT_LIMIT`).

### Código de Inicialização do Servidor
```javascript
Meteor.startup(function() {
	var num = Positions.find().count();

	// Insere dados de exemplo se não houver nenhum dado na coleção `Positions`
	if (num === 0) {
		Positions.insert({x: 100, y: 200, asset: 'apple'});
		Positions.insert({x: 10, y: 200, asset: 'candy'});
		Positions.insert({x: 55, y: 50, asset: 'duck'});
		Positions.insert({x: 85, y: 130, asset: 'apple'});
		Positions.insert({x: 150, y: 190, asset: 'duck'});
		Positions.insert({x: 157, y: 120, asset: 'apple'});
		Positions.insert({x: 102, y: 300, asset: 'candy'});
	}
});
```

- **`Meteor.startup`**: Executa o código quando o servidor é inicializado.
- **Verificação e Inserção de Dados**: Verifica se não há nenhum documento na coleção `Positions` e insere dados de exemplo se estiver vazia.


