import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  Meteor.methods({
  	addMessage: function(messageData) {
  		if (!Meteor.userId()) {
  			throw new Meteor.Error('no-authorized');
  		}

  		if (!messageData.content) {
  			throw new Meteor.Error('invalid');
  		}

  		messageData.date = new Date();
  		messageData.owner = Meteor.userId();

  		Messages.insert(messageData);
  	}
  });
});
