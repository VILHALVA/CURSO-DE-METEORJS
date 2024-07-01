
Template.listing.helpers({
	entries: function() {
		return Messages.find();
	},
	formattedDate: function() {
		return this.date ? moment(this.date).format("ddd, hA h:mm:ss") : '';
	}
});

Template.newEntry.events({
	'submit #entryForm': function(event){
		event.preventDefault();

		var c = $('#content').val();
		Meteor.call('addMessage', {content: c})
		// Messages.insert({content: c, date: new Date()});
		$('#content').val('');
	}
});

