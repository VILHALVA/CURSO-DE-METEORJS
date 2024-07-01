Meteor.startup(function() {
	var num = Positions.find().count();
	if(num === 0)
	{
		Positions.insert({x: 100, y:200, asset: 'apple'});
		Positions.insert({x: 10, y:200, asset: 'candy'});
		Positions.insert({x: 55, y:50, asset: 'duck'});
		Positions.insert({x: 85, y:130, asset: 'apple'});
		Positions.insert({x: 150, y:190, asset: 'duck'});
		Positions.insert({x: 157, y:120, asset: 'apple'});
		Positions.insert({x: 102, y:300, asset: 'candy'});
	}
});