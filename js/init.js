
function init(){

	
	
	//setup preloader
	var loadState =
	{
		preload: function()
		{
			//enable fps display
			game.time.advancedTiming = true;
				
			//loading message 
			var loadingMsg = game.add.text(0, 0, "Loading...", {font: "30px Courier", fill: "#ff0000"})
			loadingMsg.x = game.world.width/2 - loadingMsg.width/2;
			loadingMsg.y = game.world.height/2 - loadingMsg.height/2;
						
			//load assets
			//menu
			game.load.image("btnImg1", "assets/menu/btn1.png");
			game.load.image("btnImg2", "assets/menu/btn2.png");
			game.load.image("btnImg3", "assets/menu/btn3.png");
			game.load.image("btnImg4", "assets/menu/btn4.png");
			game.load.image("btnClose", "assets/x.png");
			//demo1
			game.load.image("imgCard", "assets/demo1/card.png");
			//demo2
			game.load.spritesheet("imgSheetEmoji", "assets/demo2/sheetEmoji.png", 125, 125, 64);//"", "", frameW, frameH, totalFrames
			//demo3
			game.load.spritesheet("imgSheet", "assets/demo3/sheet.png", 80, 80, 48);//"", "", frameW, frameH, totalFrames
			
			
		},
		
		create: function()
		{
			game.state.start("menu");//menu.js
		}
	};
	
		
	
	//setup Phaser game 
	game = new Phaser.Game(screenInnerW, screenInnerH, Phaser.CANVAS, '');//Phaser.AUTO
		
	//setup Phaser game states
	game.state.add("load", loadState);
	game.state.add("menu", menuState);
	game.state.add("demo1", demo1State);
	game.state.add("demo2", demo2State);
	game.state.add("demo3", demo3State);
	
	//start preloader
	game.state.start("load");
	
}











