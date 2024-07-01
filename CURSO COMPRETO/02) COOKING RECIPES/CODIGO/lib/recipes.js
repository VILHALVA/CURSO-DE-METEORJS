Recipes = new Mongo.Collection('recipes');

Meteor.methods({
	deleteRecipe: function(id) {

		//check if user is logged in
		if(!Meteor.userId())
		{
			throw new Meteor.Error('non-authorized', 'you are not logged in');
		}

		var recipe = Recipes.findOne({_id: id});

		if(Meteor.userId() != recipe.owner)
		{
			throw new Meteor.Error('non-authorized', 'you dont own this recipe');
		}

		Recipes.remove({_id: id});
	},
	insertRecipe: function(data) {
		//check if user is logged in

		//throw new Meteor.Error('non-authorized', 'You are not authorized');

		if(!Meteor.userId())
		{
			throw new Meteor.Error('non-authorized', 'you are not logged in');
		}

		data.owner = Meteor.userId();
		Recipes.insert(data);
	},
	updateRecipe: function(id, data) {
		//user must be logged in
		if(!Meteor.userId())
		{
			throw new Meteor.Error('non-authorized', 'you are not logged in');
		}
		//user must be the owner of the recipe
		var recipe = Recipes.findOne({_id: id});
		
		if(Meteor.userId() != recipe.owner)
		{
			throw new Meteor.Error('non-authorized', 'you dont own this recipe');
		}

		//make sure it's the right owner
		data.owner = Meteor.userId();

		//update the db
		Recepies.update(id, data);
	}
});