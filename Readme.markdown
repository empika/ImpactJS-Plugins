# ImpactJS Plugins

Plugins for the Impact JS library

* Debug Display
* HTML Button
* Sprite tween

To use, pull down the repository and place the files in a folder called 'empika' inside your plugins directory. e.g. /lib/plugins/empika/*.*

## Debug Display
		ig.module( 
			'game.main' 
		)
		.requires(
			'impact.game',
			'impact.font',
			'plugins.empika.debug_display' // require the debug display plugin
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
					var x = ig.system.width/2, y = ig.system.height/2;
					// this.debugDisplay.draw(info, display_fps, display_average, average_time, interval_count)
					// info, array:							this will display each array element on a new line
					// display_fps, bool:				pass in true or false to either show the FPS or not. defaults to true
					// display_average, bool: 	pass in true or false to either show the average FPS over a period of time or not. 
					//													defaults to false
					// average_time, integer: 	amount of of time between samples. defaults to 10000 (10 seconds)
					// interval_count, integer:	amount of samples to take over time. defaults to 500
					this.debugDisplay.draw(["my", "info", "here"], true, true, 10000, 100);
				}
			});
			ig.main( '#canvas', MyGame, 60, 512, 384, 2 );
		});
		
## HTML Buttons
### main.js
		ig.module( 
			'game.main' 
		)
		.requires(
			'impact.game',
			'plugins.empika.html_button',
			'game.entities.button'
		)
		.defines(function(){

		MyGame = ig.Game.extend({
			init: function() {
				// ig.input.bindTouch( element_name, mousedown_func, mouseup_func, click_func  );
				// element_name, string:		name of an element, required. eg '#button'
				// mousedown_func, string:	name of a function to call on mouse down, defaults to false
				// mouseup_func, string:		name of a function to call on mouse up, defaults to false
				// click_func, string:			name of a function to call on mouse click, defaults to false
				ig.input.bindTouch( '#button', 'btndown', 'btnup', 'btnclick' );
			},
			update: function() {
				this.parent();
			},
			draw: function() {
				// Draw all entities and backgroundMaps
				this.parent();
				// Add your own drawing code here
				var x = ig.system.width/2, y = ig.system.height/2;
			}
		});

### game.entities.button.js
		ig.module(
		  'game.entities.button'
		)
		.requires(
		  'impact.entity'
		)
		.defines(function() {
		  EntityButton = ig.Entity.extend({  	
		  	init: function( x, y, settings ) {
		        this.parent( x, y, settings );
		    },
		    update: function(){
		      if( ig.input.pressed('btndown')){
		       console.log("button log down"); 
		      }
		      if( ig.input.pressed('btnup')){
		       console.log("button log up"); 
		      }
		      if( ig.input.pressed('btnclick')){
		       console.log("button log click"); 
		      }
		    }
		  });
		});
		
## Entity Tweening
### game.entities.player.js
        ig.module('game.entities.player')
        .requires(
          'impact.entity',
          'plugins.empika.entity_tween'
        )
        .defines(function () {
          EntityPlayer = ig.Entity.extend({
            init: function(x,y,settings){
                this.parent(x,y,settings);
                // actions object
                // actions, array:  An array of action objects
                // post_anim, string: The animation to revert to after the animation has finished
                
                // action objects
                // x, integer:  Translation along the x axis
                // y, integer:  Translation along the y axis
                // duration, float: The time that the tween will take
                // anim, string:    The name of the animation to use during the tween
                // easing, Tween object: The ease factore applied to the tween. See the source for a full list.
                // Many thanks to https://github.com/nefD and https://github.com/xdissent for these
                // callback, function: a function to call once the tween action has completed
                // callback_args, array: an array of arguments to pass in to the callback function
                actions = {actions: [
                  { x: 15, y: 10, duration: 2, anim: 'walk', easing: ig.Tween.Easing.Cubic.EaseIn },
                  { x: 0, 
                    y: 0,
                    duration: 5,
                    anim: 'idle',
                    callback: function(){
                      console.log(arguments[0], arguments[1]);
                    }, 
                    callback_args: ["argument 1", "argument 2"],
                  },
                  { x: -15, y: -10, duration: 2, anim: 'idle', easing: ig.Tween.Easing.Cubic.EaseOut }
                ], post_anim: 'idle'};
                
                // Add the actions to the entity
                this.initialize_animations(actions);
                
                // Kick off the Tweening
                this.anim_start();
            }
          });
        });
		
### index.html
	<!DOCTYPE html>
	<html>
	<head>
		<title>Impact Game</title>
		<style type="text/css">
			html,body {	background-color: #000; color: #fff; font-family: helvetica, arial, sans-serif; margin: 0; padding: 0; font-size: 12pt; }
			#canvas { position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto; border: 1px solid #555; }
			.button {
				background-image: url(media/soldier_sprite.png); background-repeat: no-repeat; width: 64px; height: 64px; position: absolute; bottom: 0px;
				-webkit-touch-callout: none; -webkit-user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0); -webkit-text-size-adjust: none;
				-moz-background-size: 256px; background-size: 256px; image-rendering:-moz-crisp-edges; -ms-interpolation-mode:nearest-neighbor;
			}
			#button { left: 0; background-position: 0, 0; }
		</style>

		<script type="text/javascript" src="lib/impact/impact.js"></script>
		<script type="text/javascript" src="lib/game/main.js"></script>
	</head>
	<body>
		<canvas id="canvas"></canvas>
		<div class="button" id="button"></div>
	</body>
	</html>
