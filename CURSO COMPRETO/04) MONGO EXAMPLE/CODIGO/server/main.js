import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  var num = Sales.find().count();

  if (num === 0){
  	var qty, prodIndex;
  	var productOptions = ['red', 'green', 'orange', 'purple', 'blue', 'white'];
  	for(var i = 0; i < 400; ++i) {

  		qty = Math.ceil(1 + Math.random() * 20);
  		prodIndex = Math.floor(Math.random() + productOptions.length);

  		Sales.insert({
  			qty: qty,
  			total: 100 * qty,
  			time: new Date(),
  			products: productOptions.slice(0, prodIndex)
  		});
  	} 
  }
});
