


var demo2State = 
{
	
	create: function()
	{
		//set bg color
		game.stage.backgroundColor = "#202020";
		
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
		
		
		
		
		var totalFrames = 64;//spritesheet total images
		
		//update every 2 seconds
		var timer = game.time.create(false);
		timer.loop(2000, timerEvent, this);
		timer.start();
		
		function timerEvent(){
			
			var msg = {};
			
			//generate random message
			for (var i=1; i<4; i++){
				
				msg[i] = {};
				
				// 0=image, 1=text
				var msgType = Math.round( Math.random() );
				
				if(msgType == 0){
					//image
					//random num from the spritesheet
					msg[i].msgType = "image";
					msg[i].msgValue = Math.floor( Math.random()*totalFrames );
					
				} else {
					//text
					//generate random text
					msg[i].msgType = "text";
					msg[i].msgValue = this.generateRndText();
				}
				
			}
			
			
			//call tool to display the message
			this.displayMsg(msg[1], msg[2], msg[3]);
			
		}
			
		
		//end create
	},
	
	
	
	
	
	
	displayMsg: function(part1, part2, part3)
	{
		//tool to display message
		//param structure example:
		/*
			part1 =
			{
				msgType: "text",
				msgValue: "random text"
			};
			
			part2 =
			{
				msgType: "image",
				msgValue: 14 //frame number in the emoji spritesheet
			};
			
			etc..
		*/
				
		
		var minFontSize = 50;
		var maxFontSize = 80;
		var fontSize = minFontSize + Math.round( Math.random() * (maxFontSize - minFontSize) );
		var fontInfo = fontSize + "px Arial";
		
		//img spritesheet vars
		var frameW = 125;
		var frameH = 125; 
		var totalFrames = 64;		
		var scale = 1;
		var spawnX = 0;
		var spawnY = 0;
		var gap = 25;
				
		
		// get group at game.world
		var g;
		game.world.forEach( function(item) {
			if(item.name == "group"){
				g = item;
			}
		});
		
		//clear group graphics
		g.forEach( function(item) {
			item.kill();
		});
		
		g.scale.setTo(1, 1);
		
		//spawn images and/or texts
		var ar = [part1, part2, part3];
		
		for (var i=0; i<ar.length; i++){
			
			if(ar[i].msgType == "image"){
				//image
				var s = game.add.sprite(spawnX, spawnY, "imgSheetEmoji");
				s.frame = ar[i].msgValue;
				s.height = fontSize;
				s.width = fontSize;
				spawnX += s.width + gap;
				g.add(s);
				
			} else {
				//text
				var txt = game.add.text(spawnX, spawnY, ar[i].msgValue, {font: fontInfo, fill: "#ff0000"} );
				spawnX += txt.width + gap;
				g.add(txt)
			}
			
		}
		
				
		//position the group
		if(g.width > game.world.width){
			scale = ( (100*game.world.width)/g.width )/100;		
			g.scale.setTo(scale,scale);
		}
		
		g.x = game.world.width/2 - g.width/2;
		g.y = game.world.height/2 - g.height/2;
			
		
		
	},
	
	
	
	
	
	generateRndText: function () {
		//generate random text
		
		var txtMinLength = 3;
		var txtMaxLength = 6;
		var txtLength = txtMinLength + Math.round( Math.random() * (txtMaxLength - txtMinLength) );
		
		var txt = "";
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		
		for (var i=0; i<txtLength; i++){
			//push rnd char to txt string
			txt += chars.charAt( Math.floor( Math.random() * chars.length ) );
		}
				
		return txt;
	},
	
	
	
	
	
	doResize: function () {
		window.removeEventListener("resize", demo2State.doResize);
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





