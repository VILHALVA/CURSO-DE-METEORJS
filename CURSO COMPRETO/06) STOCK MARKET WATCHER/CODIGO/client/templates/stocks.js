Template.stocks.helpers({
	stocks: function() {
		var entries;

		if(Session.get('filter') === 'up')
		{
			entries = Stocks.find({change: {$gt: 0}});
		} else if(Session.get('filter') === 'down') 
		{
			entries = Stocks.find({change: {$lt: 0}});
		} else 
		{
			entries = Stocks.find();
		}

		return entries;
	},
	cssPriceClass: function() {
		var newClass = '';
		if(this.change > 0)
		{
			newClass = 'price-up';
		} else if(this.change < 0)
		{
			newClass = 'price-down';
		}
		return newClass;
	}
	// ,
	// sessionExample: function() {
	// 	console.log(Session.get('filter'));
	// 	return Session.get('filter');
	// }
});

Template.stocks.events({
	'click .delete': function(event) {
		Meteor.call('deleteStock', this._id);
	},
	'change #stock-filter': function(event){
		Session.set('filter', event.target.value);

	}
});

