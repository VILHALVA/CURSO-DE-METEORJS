Template.listing.helpers({
	entries: function() {
		return Recipes.find({}, {title: 1});
	},
	isOwner: function() {
		if(!Meteor.userId()){
			return false;
		}

		//check if the user is the owner
		return Meteor.userId() === this.owner;
	}
});

Template.listing.events({
	'click .delete': function(event) {
		Meteor.call('deleteRecipe', this._id);
	}
});