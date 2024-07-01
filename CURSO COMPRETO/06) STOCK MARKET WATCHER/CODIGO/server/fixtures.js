Meteor.startup(function() {
	//count entries

	var num = Stocks.find().count();

	if(num === 0)
	{
		// var fixtures = [
		// 	{
		// 		symbol: 'GOOG',
		// 		price: 728.32,
		// 		change: 1
		// 	},
		// 	{
		// 		symbol: 'AAPL',
		// 		price: 116.77,
		// 		change: -1
		// 	},
		// 	{
		// 		symbol: 'AMZN',
		// 		price: 659.38,
		// 		change: 1
		// 	},
		// 	{
		// 		symbol: 'MSFT',
		// 		price: 53.51,
		// 		change: -1
		// 	}
		// ];

		var fixtures = [
			{ symbol: 'ASX.AX' },
			{ symbol: 'ANZ.AX' },
			{ symbol: 'BXB.AX' },
			{ symbol: 'WBC.AX' },
			{ symbol: 'IAG.AX' },
			{ symbol: 'CBA.AX' },
			{ symbol: 'BHP.AX' },
			{ symbol: 'GOOO' },
			{ symbol: 'AMZN' },
			{ symbol: 'MSFT' }
		];

		fixtures.forEach(function(element){
			Stocks.insert(element);
		});
	}
});