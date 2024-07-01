Template.recipeForm.helpers({
	showTitle: function() {
		var title = 'New Recipe';

		var recipeId = FlowRouter.getParam('id');
		var recipe = Recipes.findOne({_id: recipeId});
		if(recipe){
			title = recipe.title;
		}
		return title;
	},
	recipe: function() {
		var recipeId = FlowRouter.getParam('id');
		var recipe = Recipes.findOne({_id: recipeId}) || {};
		return recipe;
	},
	canShow: function() {

		var result = true;
		//check if user is logged in
		if(!Meteor.userId())
		{
			result = false;
			throw new Meteor.Error('non-authorized', 'you are not logged in');
		} else 
		{
			var recipeId = FlowRouter.getParam('id');
			var recipe = Recipes.findOne({_id: recipeId})

			if(recipe) 
			{
				result = recipe.owner === Meteor.userId();
			}
		}

		if(result) 
		{
			return true;
		} else {
			FlowRouter.redirect('/');
		}
	},
	isPrivate: function() {
		var recipeId = FlowRouter.getParam('id');
		var recipe = Recipes.findOne({_id: recipeId})

		if(!recipe)
		{
			return false;
		} else {
			return recipe.private ? 'checked' : false;
		}
	}
});

Template.recipeForm.events({
	'submit #recipeForm': function(event){
		event.preventDefault();

		var data = {
			title: $('[id="title"]').val(),
			ingredients: $('[id="ingredients"]').val(),
			instructions: $('[id="instructions"]').val(),
			private: event.target.querySelector('#private').checked
		};

		var recipeId = FlowRouter.getParam('id');

		if(recipeId)
		{
			//Recipes.update(recipeId, data);
			Meteor.call('updateRecipe',recipeId, data);
		} else 
		{
			//Recipes.insert(data);
			Meteor.call('insertRecipe', data, function(err, results) {
				if(err)
				{
					sAlert.error(err.reason);
				} else 
				{
					sAlert.success('New recipe created!');
				}
			});
		}


		// redirect to the listing page
		FlowRouter.go('/');
	}
});