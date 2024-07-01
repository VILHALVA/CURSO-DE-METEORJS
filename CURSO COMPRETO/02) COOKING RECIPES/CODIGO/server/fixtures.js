Meteor.startup(function(){
	//count recipes entries
	var num = Recipes.find().count();

	if(num === 0)
	{
		var fixtures = [
			{
				title: 'Pasta',
				ingredients: '250g of pasta,1l water',
				instructions: 'Heat water and add pasta. Stir frequently.'
			},
			{
				title: 'Cheese sandwich',
				ingredients: '2 slices of bread, 1 slice of cheese',
				instructions: 'Put the slice of cheese in between the two slices of bread'
			}
		];

		fixtures.forEach(function(element){
			Recipes.insert(element);
		});
	}
});