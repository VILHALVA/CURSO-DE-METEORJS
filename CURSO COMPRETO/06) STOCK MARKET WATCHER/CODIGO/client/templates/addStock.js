Template.addStock.events({
	'submit #addStock': function(event) {
		event.preventDefault();

		var data = {
			symbol: event.target.querySelector('#symbol').value
		}

		Meteor.call('addStock', data);

		//clear the form
		event.target.reset();
	}
});