GameState = {
	init: function() {
		//scaling options
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		//movement threshold (pixels)
		this.MOVEMENT_LIMIT = 5;
	},
	preload: function() {
		this.load.image('backyard', 'images/backyard.jpg');
		this.load.image('duck', 'images/rsz_duck.png');
		this.load.image('candy', 'images/rsz_candy.png');
		this.load.image('apple', 'images/rsz_apple.png');
	},
	create: function() {
		this.background = this.add.sprite(0, 0, 'backyard');
		this.items = this.add.group();

		
		var state = this;
		
		Tracker.autorun(function(){
			let positions = Positions.find();
			console.log('number of items ' + positions.count());

			positions.forEach(function(pos){
				let id = pos._id._str ? pos._id._str : pos._id;
				let item = state.items.filter(function(element) {
					return element._id == id;
				});

				item = item.list[0];

				if(!item)
				{
					//sprite creation
					item = state.items.create(pos.x, pos.y, pos.asset);
					item._id = id;
					item._idOriginal = pos._id;
					item.inputEnabled = true;
					item.input.enableDrag();
				} else 
				{
					item.x = pos.x;
					item.y = pos.y;
				}
			});
		});
	},
	update: function() {
		this.items.forEach(function(item){
			//init previous position
			if(!item.previousPosition) 
			{
				item.previousPosition = {x: item.x, y: item.y};
			} else if(item.input.isDragged && (Phaser.Point.distance(item.position, item.previousPosition) > this.MOVEMENT_LIMIT))
			{
				//update db
				Positions.update(item._idOriginal,  {$set: {x: item.x, y: item.y}});
			}
		}, this);
	}
}