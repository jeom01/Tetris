(function($){
	var Frag = Backbone.Model.extend({
		initialize: function() {
			this.posX = 0;
			this.posY = 0;
			this.color = 'black';
		}
	});
	
	var FragList = Backbone.Collection.extend({
		model: Frag
	});
	
	var GameView = Backbone.View.extend({
		el: $('body'),
		
		initialize: function(){
			_.bindAll(this, 'render');
			this.test = 'hej';
			this.blockSize = 30;
			this.margin = 3;
			this.blocksX = 10;
			this.blocksY = 20;
			this.landed = new FragList();
			for (var i = 0; i < 4; i++) {
				var frag = new Frag({
					posX: Math.floor(Math.random()*this.blocksX), 
					posY: Math.floor(Math.random()*this.blocksX)
				});
				landFrag(frag);
			}
			this.render();
		},
		
		landFrag: function(frag){
			this.landed.add(frag);
		},
		
		render: function(){
			$(this.el).append("<div class='gameView'></div>");
			$(".gameView").width((this.blockSize+this.margin)*this.blocksX + this.margin);
			$(".gameView").height(((this.blockSize + this.margin)*this.blocksY)+this.margin);
			_(this.landed.models).each(function(frag){ // in case collection is not empty
				var top = (frag.posY*this.blockSize*this.margin);
				var left = (frag.posX*this.blockSize*this.margin);
				var colors = ['blue', 'red', 'yellow', 'green'];
				var color = colors[Math.floor(Math.random()*colors.length)];
				$(".gameView").append("<div class='frag' style='top:"+top+";left:"+left+";background:"+color+";'></div>")
			}, this);
		}
	});
	
	var gameView = new GameView();
	
})(jQuery);