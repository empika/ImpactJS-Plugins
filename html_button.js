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
  'plugins.html_button'
)
.requires(
  'impact.input'
)
.defines(function() {
  ig.Input.inject({

    // Overwrite bindTouch so we can bind click if touch is not available
    bindTouch: function( selector, action_down, action_up, click ) {
      var action_down = typeof(action_down) != 'undefined' ? action_down : false;
      var action_up = typeof(action_up) != 'undefined' ? action_up : false;
      var click = typeof(click) != 'undefined' ? click : false;
      
  		var element = ig.$( selector );

  		var that = this;
      if('ontouchstart' in element && 'ontouchend' in element){
    		element.addEventListener('touchstart', function(ev) {
    			that.touchStart( ev, action_down );
    		}, false);
    		
    		element.addEventListener('touchend', function(ev) {
    			that.touchEnd( ev, action_down );
    		}, false);
  		}
  		else{
  		  if( action_down ){
    		  element.addEventListener('mousedown', function(ev) {
      			that.touchStart( ev, action_down );
      		}, false);
    		}
    		
  		  if( action_up ){
      	  element.addEventListener('mouseup', function(ev) {
      			that.touchStart( ev, action_up );
      		}, false);
    		}
    		
    		if( click ){
    		  element.addEventListener('click', function(ev) {
      			that.touchStart( ev, click );
      		}, false);
    		}
  		}
  	}
  	
  });
});