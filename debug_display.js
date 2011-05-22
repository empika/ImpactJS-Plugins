ig.module( 
	'plugins.debug_display' 
)
.requires(
	'impact.game'
)
.defines(function(){
  DebugDisplay = ig.Class.extend({

  	framerateNow: (new Date()).getTime(),
  	frames: [0,0,0,0,0,0,0,0,0,0,0],
  	frameCounter: 0,
  	info: [],
  	
    init: function(font)
    {
    	this.font = font;
    },
    
    draw: function(info, display_fps){
      if (display_fps == null){
         display_fps = true;
      }
      var offset = 0;
      if(display_fps){
        this.font.draw( this.calculateFrameRate() + 'fps', 2, 2 );
        offset = this.font.height;
      }
      for(var x = 0; x < info.length; x = x + 1){
        this.font.draw( info[x], 2, offset + (this.font.height * x) + 2);
      }
    },
    
    calculateFrameRate: function(){
      var now = (new Date()).getTime();
      var delta = now - this.framerateNow;
      var avg = 0;
      for(var x = 0; x < this.frames.length; x = x+1){
        avg = avg + this.frames[x];
      }
      if(this.frameCounter < this.frames.length){
        this.frameCounter = this.frameCounter + 1;
      }
      else{
        this.frameCounter = 0;
      }
      this.frames[this.frameCounter] = 1000/delta;
      this.framerateNow = (new Date()).getTime();
      this.frameCounter = this.frameCounter + 1;
      return Math.floor(avg / 11);
    }
    
  });
});