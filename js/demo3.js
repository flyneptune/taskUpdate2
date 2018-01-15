


var demo3State = 
{
	
	create: function()
	{
		//set bg color
		game.stage.backgroundColor = "#CECECE";
		
		//setup groups
		var group = game.add.group();//container group for animation
		group.name = "group";			
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
		
		
			
		//setup vars
		var totalS = 10;//10 total sprites on screen
		var frameW = 80;
		var frameH = 80; 
		var totalFrames = 48;
		
		var scale = 1;
		
		var duration = (1000/60 * totalFrames*2) - 14;
		var delay = duration/totalS;
		
		var emitX = game.world.width/2 - frameW/2;
		var emitY = game.world.height;
				
		//create sprites
		for(var i=0; i<totalS; i++){
			var s = game.add.sprite(emitX, emitY, "imgSheet");
			group.add(s);
			s.scale.setTo(scale, scale);
				
			s.animations.add("fly");
			s.visible = false;
			
			var tarX = emitX + Math.random()*50
			var tarY = game.world.height * 0.7;
			
			var delayDelta = i*delay; 
						
			var tween = game.add.tween(s).to( { x: tarX, y: tarY }, duration, Phaser.Easing.Default, true, delayDelta, -1);
			
			tween.onStart.add( function(group, s)
				{
					s.target.visible = true;
					//group.bringToTop(s);
					s.target.animations.play("fly", 50, true);	
					
				}, this);
		
		}
		
	},
	
	
	
	
	
	doResize: function () {
		window.removeEventListener("resize", demo3State.doResize);
		game.state.start("menu");//menu.js
	},
	
	
	
	
	
	update: function()
	{
		//
	},
	
	
	
	
	
	render: function()
	{
		//display fps in debugger
		game.debug.text("FPS: "+game.time.fps, 2, 14, "#00ff00");
	},
	
	
	
	
	
	//button callback
	startMenu: function(){
		game.state.start("menu");//menu.js
	}		
	
	
	
	
	
};





