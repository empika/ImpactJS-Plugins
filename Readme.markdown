# ImpactJS Plugins

Plugins for the Impact JS library

* Debug Display
* HTML Button

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
			'plugins.html_button',
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
	
Copyright (C) 2011 by Edward Parris.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
