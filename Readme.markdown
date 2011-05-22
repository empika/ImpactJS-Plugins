# ImpactJS Plugins

Plugins for the Impact JS library

## Debug Display
		ig.module( 
			'game.main' 
		)
		.requires(
			'impact.game',
			'impact.font',
			'plugins.debug_display' // require the debug display plugin
		)
		.defines(function(){
			MyGame = ig.Game.extend({
				font: new ig.Font( 'media/04b03.font.png' ),
				init: function() {
					// create a new DebugDisplay, pass in your font
					this.debugDisplay = new DebugDisplay( this.font );
				},
				update: function() {
					this.parent();
				},
				draw: function() {
					this.parent();
					var x = ig.system.width/2,
						y = ig.system.height/2;
					// this will display each array element on a new line
					// pass in true or false to either show the FPS or not. defaults to true
					this.debugDisplay.draw(["my", "info", "here"], true);
				}
			});
			ig.main( '#canvas', MyGame, 60, 512, 384, 2 );
		});