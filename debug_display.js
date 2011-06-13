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
  	average: [0],
  	frameCounter: 0,
  	info: [],
  	avg_fps: 0,
  	
    init: function(font)
    {
    	this.font = font;
    },
    
    draw: function(info, display_fps, display_average, average_time, interval_count){
      var info = typeof(info) != 'undefined' ? info : [];
      var display_fps = typeof(display_fps) != 'undefined' ? display_fps : true;
      var display_average = typeof(display_average) != 'undefined' ? display_average : false;
      var average_time = typeof(average_time) != 'undefined' ? average_time : 10000; // 10 seconds
      var interval_count = typeof(interval_count) != 'undefined' ? interval_count : 500; // 10 seconds
      
      var offset = 0;
      var fps = 0;
      if(display_fps){
        fps = this.calculateFrameRate();
        this.font.draw( fps + 'fps', 2, 2 );
        offset = this.font.height;
      }
      
      if(display_fps && display_average){
        if((new Date()).getTime() % average_time < 100){
          this.avg_fps = this.calculateAverage(fps, interval_count);
        }
        this.font.draw( this.avg_fps + 'fps over time', 2, offset + 2 );
        offset = offset + offset + 4;
      }
      for(var x = 0; x < info.length; x = x + 1){
        this.font.draw( info[x], 2, offset + (this.font.height * x) + 2);
      }
    },
    
    calculateFrameRate: function(){
      var now = (new Date()).getTime();
      var delta = now - this.framerateNow;
      var avg = 0;
      var av_length = this.frames.length;
      for(var x = 0; x < av_length; x = x+1){
        avg = avg + this.frames[x];
      }
      if(this.frameCounter < av_length){
        this.frameCounter = this.frameCounter + 1;
      }
      else{
        this.frameCounter = 0;
      }
      this.frames[this.frameCounter] = 1000/delta;
      this.framerateNow = (new Date()).getTime();
      this.frameCounter = this.frameCounter + 1;
      return Math.floor(avg / av_length);
    },
    
    calculateAverage: function(current, interval_count){
      var avg = 0;
      var av_length = this.average.length;
      if(av_length > interval_count){
        this.average.shift();
      }
      this.average.push(current);
      for(var x = 0; x < av_length; x = x+1){
        avg = avg + this.average[x];
      }
      return Math.floor(avg / av_length);
    }
    
  });
});