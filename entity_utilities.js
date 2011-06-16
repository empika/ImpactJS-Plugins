// Copyright (C) 2011 by Edward Parris.
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/*
Plugin Name: HTML Button
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Bind HTML buttons to ordinary mouse clicks (mouseup, mousedown, click)
Version: 0.1
Revision Date: 13-06-2011
Requires: ImpactJS
Author: Edward Parris
Author URI: http://www.nixonmcinnes.co.uk/people/edward/
Changelog
---------
0.1: Initial release.
*/

ig.module(
  'plugins.entity_utilities'
)
.requires(
  'impact.entity',
  'impact.input'
)
.defines(function() {
  ig.Entity.inject({
    
    pos_delta: {x: 0, y: 0},
    mod_x: {x:0, y:0},
  	is_clicked: false,
  	
    isMouseInside: function (){
      var entities = ig.game.entitiesUnderMouse();
      if(this == entities[entities.length -1]){
        return true;
      }
      return false;
    },
    
    dragAndDrop: function (snap, snap_after_drop, snap_grid_size_x, snap_grid_size_y){
      var snap = typeof(snap) !== 'undefined' ? snap : false;
      var snap_after_drop = typeof(snap_after_drop) !== 'undefined' ? snap_after_drop : false;
      var snap_grid_size_x = typeof(snap_grid_size_x) !== 'undefined' ? snap_grid_size_x : this.size.x;
      var snap_grid_size_y = typeof(snap_grid_size_y) !== 'undefined' ? snap_grid_size_y : this.size.y;
      
      var mouse_x = ig.input.mouse.x;
      var mouse_y = ig.input.mouse.y;
      var mod_x = 0; //mouse_x % snap_grid_size_x;
      var mod_y = 0; //mouse_y % snap_grid_size_y;
      var is_clicked = this.is_clicked;
      if( is_clicked && ig.input.state('lbtn') ) {
        if( !snap ){
          this.pos.x = mouse_x - this.pos_delta.x;
          this.pos.y = mouse_y - this.pos_delta.y;
        }
        else if( snap && !snap_after_drop ){
          mod_x = mouse_x % snap_grid_size_x;
          mod_y = mouse_y % snap_grid_size_y;
          this.pos.x = mod_x == 0 ? mouse_x : mouse_x - mod_x;
          this.pos.y = mod_y == 0 ? mouse_y : mouse_y - mod_y;
        }
      }
      else if( is_clicked && snap_after_drop ){
          mod_x = mouse_x % snap_grid_size_x;
          mod_y = mouse_y % snap_grid_size_y;
          this.pos.x = mod_x == 0 ? mouse_x : mouse_x - mod_x;
          this.pos.y = mod_y == 0 ? mouse_y : mouse_y - mod_y;
          this.is_clicked = false;
      }
      else if( ig.input.pressed('lbtn') && this.isMouseInside() ){
        this.pos_delta.x = mouse_x - this.pos.x;
        this.pos_delta.y = mouse_y - this.pos.y;
        this.is_clicked = true;
      }
      else{
        this.is_clicked = false;
      }
    },
    
    touchesAnything: function( ) {		
  		return !(
  			this.pos.x > other.pos.x + other.size.x ||
  			this.pos.x + this.size.x < other.pos.x ||
  			this.pos.y > other.pos.y + other.size.y ||
  			this.pos.y + this.size.y < other.pos.y
  		);
  	},
    
  });
});