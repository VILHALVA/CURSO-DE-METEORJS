
Template.sales.helpers({
	'sales' : function() {
		//return Sales.find({total: {$gt: 2000}});
		//return Sales.find({repeatingCustomer: {$exists: true}});
		//return Sales.find({products: {$in: ['purple', 'orange']}});
		//return Sales.find({products: {$nin: ['purple', 'orange']}});
		//return Sales.find({products: {$in: ['purple', 'orange']}, qty: {$gt: 10}});
		// return Sales.find({
		// 	$and: [
		// 		{repeatingCustomer: {$exists: true}},
		// 		{repeatingCustomer: true},
		// 	]
		// });
		return Sales.find({
			products: {$in: ['purple', 'orange']}, 
			qty: {$gt: 10}
		},
		{
			//sort: {qty : -1}
			sort: [['qty', 'asc'], ['_id', 'desc']],
			limit: 10,
			fields: {qty : 0, products: 0},
			skip: 7
		}
		);
	}
});