ig.module(
  'plugins.html_button'
)
.requires(
  'impact.input'
)
.defines(function() {
  ig.Input.inject({

    // Overwrite bindTouch so we can bind click if touch is not available
    bindTouch: function( selector, action ) {
  		var element = ig.$( selector );

  		var that = this;
      if('ontouchstart' in element && 'ontouchend' in element){
        console.log("binding touch");
    		element.addEventListener('touchstart', function(ev) {
    			that.touchStart( ev, action );
    		}, false);
    		
    		element.addEventListener('touchend', function(ev) {
    			that.touchEnd( ev, action );
    		}, false);
  		}
  		else{
  		  console.log("binding click");
  		  element.addEventListener('mousedown', function(ev) {
    			that.touchStart( ev, action );
    		}, false);
    		
  		 
    	  element.addEventListener('mouseup', function(ev) {
    			that.touchStart( ev, action );
    		}, false);
  		}
  	}
  	
  });
});