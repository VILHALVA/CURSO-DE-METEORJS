if(Meteor.isClient) {
	BlazeLayout.setRoot('#main-container');
}

FlowRouter.route('/', {
	action: function(params, queryParams) {
		console.log("you're in the home page");
		BlazeLayout.render('listing');
	}
});

FlowRouter.route('/newRecipe', {
	action: function(params, queryParams) {
		console.log("you're in the new recipe page");
		BlazeLayout.render('recipeForm');
	}
});

FlowRouter.route('/recipe/:id', {
	action: function(params, queryParams) {
		console.log("you're in the view recipe page for recipe: " + params.id);
		console.log(queryParams);
		BlazeLayout.render('recipe');
	}
});

FlowRouter.route('/editRecipe/:id', {
	action: function(params, queryParams) {
		console.log("you're in the view recipe page for recipe: " + params.id);
		//console.log(queryParams);
		BlazeLayout.render('recipeForm');
	}
});