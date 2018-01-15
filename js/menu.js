


var menuState = 
{
	
	
	create: function()
	{
		
		//set bg color
		game.stage.backgroundColor = "#101010";
				
		//setup group
		var gui = game.add.group();
		gui.name = "gui";
					
		//add buttons
		var btn1 = game.add.button(0, 0, "btnImg1", this.startDemo1, this);
		gui.add(btn1);
		var btn2 = game.add.button(0, 0, "btnImg2", this.startDemo2, this);
		gui.add(btn2);	
		var btn3 = game.add.button(0, 0, "btnImg3", this.startDemo3, this);
		gui.add(btn3);
		var btn4 = game.add.button(0, 0, "btnImg4", this.startFullscreen, this);		
		gui.add(btn4);
	
		//set buttons and group positions
		this.setGuiPosition();
			
		//window resized
		window.addEventListener("resize", this.doResize, false);  // Set up handler for resize event
		
	},
	
	
	
	
	
	doResize: function () {
			
		if (game.scale.isFullScreen){
			game.scale.setGameSize(window.screen.width, window.screen.height);
		} else {
			game.scale.setGameSize(window.innerWidth, window.innerHeight);
		}
		
		//reposition GUI
		menuState.setGuiPosition();
		
	},
	
		
		
		
		
	render: function()
	{
		game.debug.text("v 0.5", 2, 14, "#00ff00");
	},	
		
	
	
	
	
	update: function()
	{
		//
	},
	
	
	
	
	
	//buttons callbacks
	startDemo1: function()
	{
		window.removeEventListener("resize", this.doResize);
		game.state.start("demo1");//demo1.js
	},
	startDemo2: function()
	{
		window.removeEventListener("resize", this.doResize);
		game.state.start("demo2");//demo2.js
	},
	startDemo3: function()
	{
		window.removeEventListener("resize", this.doResize);
		game.state.start("demo3");//demo3.js
	},
	startFullscreen: function()
	{
				
		if (game.scale.isFullScreen){
			game.scale.stopFullScreen();
			game.scale.setGameSize(window.innerWidth, window.innerHeight);
		} else {
			game.scale.startFullScreen(true);//antialiasing
			game.scale.setGameSize(window.screen.width, window.screen.height);	
		}
		
		//reposition GUI
		this.setGuiPosition();
					
	},
	
	
	
	
	
	setGuiPosition: function()
	{
				
		if (game.scale.isFullScreen){
			game.scale.setGameSize(window.screen.width, window.screen.height);
		} else {
			game.scale.setGameSize(window.innerWidth, window.innerHeight);
		}
				
		//find "gui" group
		for(var i=0; i<game.world.children.length; i++)
		{
			
			var tar = game.world.children[i];
			if(tar.name = "gui")
			{
				
				//loop buttons in "gui" group and set their position
				for (var n=0; n<tar.children.length; n++){
					var btn = tar.children[n];
					var btnGap = 20;//vertical gap between buttons, 20px
					
					btn.x = - btn.width/2;
					btn.y = btnGap*n + btn.height*n;
				}
				
				
				//SCALE gui GROUP
				//button original size: 600x200
				
				//shorthand
				var gameW = game.world.width;
				var gameH = game.world.height;
				
				var guiScale;
				
				//todo: finalize
				//get screen aspect ratio
				if(gameW > gameH){
					//widescreen
					guiScale = 0.75;
				} else {
					//vertical
					guiScale = 0.75;			
				}
				
				tar.scale.setTo(guiScale, guiScale);	
				tar.x = gameW/2;
				tar.y = gameH/2 - tar.height/2;
					
				//check and fix to see if gui group width/height is larger than game screen
				if(tar.width > gameW){
					tar.width = gameW;
				}
				if(tar.height > gameH){
					tar.height = gameH;
					tar.y = gameH/2 - tar.height/2;
				}
			
			}
		}
		
		
	}
	
	
	
	
	
};




