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
Plugin Name: Debug Display
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Show FPS as well as arbitrary debug information in an ImpactJS game
Version: 0.2
Revision Date: 13-06-2011
Requires: ImpactJS
Author: Edward Parris
Author URI: http://www.nixonmcinnes.co.uk/people/edward/
Changelog
---------
0.2: Add average FPS over longer time periods.
0.1: Initial release.
*/

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