/*
Plugin Name: Debug Display
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Show FPS as well as arbitrary debug information in an ImpactJS game
Version: 0.3
Revision Date: 20-05-2012
Requires: ImpactJS
Author: Edward Parris
Author URI: http://www.nixonmcinnes.co.uk/people/edward/
Changelog
---------
0.3: Namespace the plugin.
0.2: Add average FPS over longer time periods.
0.1: Initial release.
*/

ig.module(
	'plugins.empika.debug_display'
)
.requires(
	'impact.game'
)
.defines(function(){
  DebugDisplay = ig.Class.extend({

  	framerateNow: (new Date()).getTime(),
  	frames: [],
  	average: [],
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
        this.font.draw( 'FPS: ' + fps, 2, 2 );
        offset = this.font.height;
      }

      if(display_fps && display_average){
        var min = this.average.min() !== Infinity ?  this.average.min() : 0;
        var max = this.average.max() !== Infinity ?  this.average.max() : 0;
        if((new Date()).getTime() % average_time < 100){
          this.avg_fps = this.calculateAverage(fps, interval_count);
        }
        this.font.draw('Avg FPS: ' + this.avg_fps + ' Min: ' + min + ' Max: ' + max, 2, offset + 2 );
        offset = offset + offset;
      }
      for(var x = 0; x < info.length; x = x + 1){
        this.font.draw( info[x], 2, offset + (this.font.height * x) + 2);
      }
    },

    calculateFrameRate: function(){
      var now = (new Date()).getTime();
      var delta = now - this.framerateNow;
      var avg = this.frames.sum();
      var av_length = this.frames.length;
      if(av_length > 11){
        this.frames.shift();
      }
      this.frames.push(1000/delta);
      this.framerateNow = now;
      return Math.floor(avg / av_length);
    },

    calculateAverage: function(current, interval_count){
      var av_length = this.average.length;
      if(av_length > interval_count){
        this.average.shift();
      }
      this.average.push(current);
      return Math.floor(this.average.sum() / av_length);
    }


  });
});

// From http://snippets.dzone.com/posts/show/769
Array.prototype.sum = function(){
	for(var i=0,sum=0;i<this.length;sum+=this[i++]);
	return sum;
}
Array.prototype.max = function(){
	return Math.max.apply({},this)
}
Array.prototype.min = function(){
	return Math.min.apply({},this)
}