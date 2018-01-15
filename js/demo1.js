


var demo1State = 
{
	
	create: function()
	{
		//set bg color
		game.stage.backgroundColor = "#202020";
				
		//setup groups
		var group = game.add.group();
		group.name = "group";
		this.group2 = game.add.group();
		this.group2.name = "group2";
		
		var gui = game.add.group();//gui on top z-index
		gui.name = "gui";
		
		//setup close button ("x"), return to menu
		var btn = game.add.button(0, 0, "btnClose", this.startMenu, this);
		gui.add(btn);
		
		//todo: scale (max 5% of screen)
		btn.x = game.world.width - btn.width;
		btn.y = 0;
		
		//window resized, fallback to menu
		window.addEventListener("resize", this.doResize, false);  // Set up handler for resize event
		
		
		
				
		//setup card vars
		this.totalS = 144;//144
		this.scale = 0.5;
		this.sLoadW = 500; //initial card size
		this.sLoadH = 725;
		
		//check and fix for when the screen size is smaller then the 2 columns of the cards
		if(game.world.width < this.sLoadW*this.scale*2){
			var tarW = game.world.width/2;
			this.scale = ( (100*tarW)/this.sLoadW )/100;
			//console.log(scale);
		}
		
		this.sW = this.sLoadW * this.scale;
		this.sH = this.sLoadH * this.scale;
				
		this.gap = (game.world.height - (this.sLoadH*this.scale) ) / this.totalS;//gap between cards
		this.movingS = 0; //how many sprites are currently tweening
		
		//column positions
		this.leftX = 0;
		this.rightX = game.world.width - (this.sLoadW*this.scale);
		
		this.leftCol = this.totalS;
		this.rightCol = 0;
		
		this.delay = 1000; //1000
		this.duration = 2000; //2000
				
		
		this.screenBmpData = game.add.bitmapData(game.world.width, game.world.height);	
		this.cardBmpData = game.add.bitmapData(this.sW, this.sH);
				
		this.cardBmpData.copy("imgCard", 0, 0, this.sLoadW, this.sLoadH, 0, 0, this.sW, this.sH );
		this.cardBmpData.update();
				
		this.screenSprite = game.add.sprite(0, 0, this.screenBmpData, 0, group);//x,y,img,frame,group
		
		this.updateCols();
		
		
		
		this.timer = game.time.create(false);
		this.timer.loop(this.delay, this.timerEvent, this);
		this.timer.start();
		
		
		
		
	},
	
	
	
	
	
	timerEvent: function(){
			
			var s = game.add.sprite(0, 0, "imgCard");
			this.group2.add(s);
			s.scale.setTo(this.scale, this.scale);
			s.y = (game.world.height - s.height) - this.gap*(this.leftCol-1);
						
			
			var tarX = this.rightX;
			var tarY = (game.world.height - s.height) - this.gap*(this.rightCol+this.movingS) ;
			this.movingS ++;

			
			var tween = game.add.tween(s).to( { x: tarX, y: tarY }, this.duration, Phaser.Easing.Default, true );
								
			tween.onComplete.add( function(group2, s)
				{
					
					this.rightCol ++;
					this.updateCols();
					this.movingS --;
					
					s.target.kill();
					
				}, this);
			
			
			this.leftCol --;
			
			this.updateCols();
						
			//all cards from left stack moved, kill timer loop
			if(this.leftCol == 0){
				this.timer.stop();
			}
			
			
			
	},
			
	
	
	
	

	update: function()
	{
		
		/*
		console.log("----------")
		console.log("L: "+this.leftCol)
		console.log("R: "+this.rightCol)
		console.log("----------")
		*/
		
		
	},
	
	
	
	
	
	updateCols: function(){
		
		//re-render both columns based on num of left - right
		this.screenBmpData.clear();
				
		for (var i=0; i<this.leftCol; i++){
			
			var spawnY = (game.world.height - this.sH) - this.gap*i;
			this.screenBmpData.copy( this.cardBmpData, 0, 0, this.sW, this.sH, 0, spawnY, this.sW, this.sH );
		
		}
		
		for (var i=0; i<this.rightCol; i++){
			
			var spawnX = this.rightX;
			var spawnY = (game.world.height - this.sH) - this.gap*i;
			this.screenBmpData.copy( this.cardBmpData, 0, 0, this.sW, this.sH, spawnX, spawnY, this.sW, this.sH );
		
		}
						

	},
		
	
	
	
	render: function()
	{
		//display fps in debugger
		game.debug.text("FPS: "+game.time.fps, 2, 14, "#00ff00");
	},
	
	
	
	
	doResize: function () 
	{	
		window.removeEventListener("resize", demo1State.doResize);
		game.state.start("menu");//menu.js
	},
		
		
	
	
	//button callback
	startMenu: function(){
		game.state.start("menu");//menu.js
	}


	

	
};





