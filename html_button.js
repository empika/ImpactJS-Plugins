/*
Plugin Name: HTML Button
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Bind HTML buttons to ordinary mouse clicks (mouseup, mousedown, click)
Version: 0.2
Revision Date: 20-05-2012
Requires: ImpactJS
Author: Edward Parris
Author URI: http://www.nixonmcinnes.co.uk/people/edward/
Changelog
---------
0.2: Namespace the plugin.
0.1: Initial release.
*/

ig.module(
  'plugins.empika.html_button'
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