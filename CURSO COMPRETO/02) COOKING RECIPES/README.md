# COOKING RECIPES
Este código define uma aplicação web de receitas que utiliza templates para renderizar diferentes partes da interface, como a listagem de receitas, exibição de detalhes de uma receita específica e um formulário para adicionar ou editar receitas. A estrutura é típica de um aplicativo Meteor com Blaze, onde os dados são reativos e as interfaces são atualizadas automaticamente quando os dados mudam.

### Trecho 1: Estrutura Básica da Página
```html
<head>
	<title>Zenva</title>
</head>
<body>
	<div id='main-container' class='container'>
		<!--{{> listing}}-->
		{{> sAlert}}
		{{> loginButtons}}
	</div>
</body>
```

**Explicação:**

- **Cabeçalho da Página**: Define o título da página como "Zenva".
- **Corpo da Página**: Contém um `div` com id `main-container` e a classe `container`.
  - **`<!--{{> listing}}-->`**: Comentado, provavelmente seria um ponto de inserção para o template `listing`.
  - **`{{> sAlert}}`**: Renderiza o template `sAlert`, que provavelmente exibe alertas ou notificações.
  - **`{{> loginButtons}}`**: Renderiza o template `loginButtons`, que provavelmente exibe botões para login/logout.

### Trecho 2: Template `listing`
```html
<template name="listing">
	<div class="row">
  	 <div class="col-xs-12" style="margin-bottom:20px;">
	  <h1>Recipes</h1>
	  <a class="btn btn-success btn-block" href='/newRecipe' >New</a>
	 </div>
	</div>

	{{#if currentUser}}	
		
	{{/if}}
	<div class="row">
  	 <div class="col-xs-12" style="margin-bottom:20px;">
		<ul class="list-group">
		 {{#each entries}}
		  <li class="list-group-item">
		   <a href='/recipe/{{_id}}'>{{title}}</a>
		   {{#if isOwner}}
		    <a class='list-button edit btn btn-default btn-xs' href='/editRecipe/{{_id}}'>edit</a>
	        <button class="list-button delete btn btn-danger btn-xs">delete</button>
		   {{/if}}
		  </li>
		 {{/each}}
		</ul>
	 </div>
	</div>
</template>
```

**Explicação:**

- **Título e Botão Novo**: Exibe o título "Recipes" e um botão para adicionar uma nova receita.
- **Condição `currentUser`**: Verifica se há um usuário logado. Caso tenha, pode-se adicionar conteúdo específico para o usuário logado (atualmente vazio).
- **Lista de Receitas**: Itera sobre a coleção `entries` para exibir cada entrada como um item de lista (`li`).
  - **Link da Receita**: Cada item de lista contém um link para a receita (`/recipe/{{_id}}`) e o título da receita.
  - **Ações do Proprietário**: Se o usuário é o dono da receita (`isOwner`), são exibidos botões para editar (`/editRecipe/{{_id}}`) e deletar a receita.

### Trecho 3: Template `recipe`
```html
<template name="recipe">
	{{#with recipe}}
	<div class="row">
  	 <div class="col-xs-12" style="margin-bottom:20px;">
	  <h2>{{title}}</h2>
	 </div>
	</div>
	<div class="row">
	 <div class="col-xs-12" style="margin-bottom:20px;">
	 	{{ingredients}}
	 </div>
	</div>
	<div class="row">
	 <div class="col-xs-12" style="margin-bottom:20px;">
	 	{{instructions}}
	 </div>
	</div>
	{{/with}}
	<a class='btn btn-default' href='/'>Back</a>
</template>
```

**Explicação:**

- **Conteúdo da Receita**: Utiliza o helper `recipe` para obter o contexto da receita atual.
  - **Título**: Exibe o título da receita (`{{title}}`).
  - **Ingredientes**: Exibe os ingredientes (`{{ingredients}}`).
  - **Instruções**: Exibe as instruções (`{{instructions}}`).
- **Botão Voltar**: Um botão para voltar à página principal (`/`).

### Trecho 4: Template `recipeForm`
```html
<template name="recipeForm">
	{{#if canShow}}
	 	<div class="row">
  		 <div class="col-xs-12" style="margin-bottom:20px;">
			<h2>{{showTitle}}</h2>
		 </div>
		 </div>
		{{#with recipe}}
		 <div class="row" style="margin-bottom:20px;">
			<form id="recipeForm">
				<div class='form-group'>
					<input class='form-control'  type="text" id="title" placeholder="Title" value='{{title}}' required />
				</div>
				<div class='form-group'>
					<input class='form-control' type="text" id="ingredients" placeholder="Ingredients" value='{{ingredients}}' required />
				</div>
				<div class='form-group'>
					<textarea class='form-control'  id="instructions" placeholder="Instructions" required>{{instructions}}</textarea> 
				</div>
				<div class='form-group'>Private?
					<input type="checkbox" id="private" checked="{{isPrivate}}"/>
				</div>
				<button class='btn btn-primary' type="submit">Save</button>
				<a class='btn btn-default' href='/'>Back</a>
			</form>
			
		 </div>
		{{/with}}
	{{/if}}
</template>
```

**Explicação:**

- **Condição `canShow`**: Verifica se o formulário pode ser exibido.
- **Título do Formulário**: Exibe um título (`{{showTitle}}`).
- **Formulário de Receita**: Um formulário para adicionar/editar uma receita.
  - **Campo Título**: Campo de entrada para o título da receita (`{{title}}`).
  - **Campo Ingredientes**: Campo de entrada para os ingredientes (`{{ingredients}}`).
  - **Campo Instruções**: Área de texto para as instruções (`{{instructions}}`).
  - **Campo Privado**: Checkbox para marcar a receita como privada (`{{isPrivate}}`).
  - **Botão Salvar**: Botão para salvar a receita.
  - **Botão Voltar**: Botão para voltar à página principal (`/`).


