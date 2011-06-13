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
        console.log("binding touch");
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