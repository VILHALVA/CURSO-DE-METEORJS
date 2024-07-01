Template.recipe.helpers({
	recipe: function() {
		var recipeId = FlowRouter.getParam('id');
		var recipe = Recipes.findOne({_id: recipeId});
		console.log(recipe);
		return recipe;
	}
});