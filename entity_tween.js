/*
Plugin Name: Sprite Tween
Plugin URI: https://github.com/empika/ImpactJS-Plugins
Description: Tween entities between given positions in an ImpactJS game
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

ig.module('plugins.empika.entity_tween')
.requires(
  'impact.entity',
  'impact.game'
)
.defines(function(){
  ig.Entity.inject({

    anim_current_pos: {x: 0, y: 0},
    anim_pos_delta: {x: 0, y: 0},
    anim_duration: 0,
    anim_timer: false,
    anim_started: false,
    anim_complete: false,
    anim_actions: [],
    anim_current_action_number: 0,
    anim_current_action: null,
    
    
    anim_set_position: function(){
      this.anim_current_pos = this.pos;
    },
    
    initialize_animations: function(options){
      /*
        [{ x: 10, y: 10, duration: 5, anim: 'idle', callback: function(){ // do something }, callback_args: [1,2,3]},
        { x: -10, y: -10, duration: 10, anim: 'idle', callback: function(){ // do something }, callback_args: [1,2,3]}]
      */
      this.anim_actions = options.actions;
      this.anim_post_anim = options.post_anim;
      this.anim_init();
    },
    
    anim_all_complete: function(){
      this.currentAnim = this.anims[this.anim_post_anim];
      this.anim_current_action_number = 0;
    },
    
    anim_start: function(){
      this.anim_started = true;
    },
    anim_stop: function(){
      this.anim_started = false;
    },
    
    anim_complete: function(){
      if( typeof(this.anim_current_action.callback) === "function" ){
        this.anim_current_action.callback.apply(this.anim_current_action.callback, this.anim_current_action.callback_args);
      }
      if ( this.anim_current_action_number < this.anim_actions.length - 1 ){
        this.anim_current_action_number = this.anim_current_action_number + 1;
        this.anim_init();
      }
      else{
        this.anim_started = false;
        // this.anim_complete = true;
        this.anim_all_complete();
      }
      
    },
    
    anim_init: function(){
      this.anim_current_action = this.anim_actions[this.anim_current_action_number];
      this.anim_set_position();
      this.currentAnim = this.anims[this.anim_current_action.anim];
      if(this.anim_timer){
        this.anim_timer.set(this.anim_current_action.duration);
      }
      else{
        this.anim_timer = new ig.Timer(this.anim_current_action.duration);
      }
    },
    
    anim_calculate_pos_delta: function(initial, current, pos_delta, duration, time_delta, easing){
      var percent_complete = (Math.abs(time_delta)).map( 0, duration, 1, 0 );
      if( typeof(easing) == "function"){
        percent_complete = easing(percent_complete);
      }
      
      var new_pos = initial + (pos_delta * percent_complete),
        positive = pos_delta > 0 ? true : false;
      
      if(positive){
        new_pos = current > initial + pos_delta ? 0 : new_pos;
      }
      else{
        new_pos = current < initial + pos_delta ? 0 : new_pos;
      }

      return new_pos;
    },
    
    anim_update_entity: function(){
      if ( this.anim_timer.delta() < 0 ){
        //this.anim_calculate_pos_delta();
        var x = this.anim_calculate_pos_delta(
          this.anim_current_pos.x,
          this.pos.x,
          this.anim_current_action.x,
          this.anim_current_action.duration,
          this.anim_timer.delta(),
          this.anim_current_action.easing
        );
        var y = this.anim_calculate_pos_delta(
          this.anim_current_pos.y,
          this.pos.y,
          this.anim_current_action.y,
          this.anim_current_action.duration,
          this.anim_timer.delta(),
          this.anim_current_action.easing
        );
        
        this.pos.x = x;
        this.pos.y = y;
      }
      else{
        this.anim_complete();
      }
    },
    
    update: function(){
      this.parent();
      if(this.anim_started === true){
        this.anim_update_entity();
      }
    }
    
  });
  
  // Tween easing from https://github.com/xdissent/impact-tween
  ig.Tween = {};
  ig.Tween.Easing = { Linear: {}, Quadratic: {}, Cubic: {}, Quartic: {}, Quintic: {}, Sinusoidal: {}, Exponential: {}, Circular: {}, Elastic: {}, Back: {}, Bounce: {} };

  ig.Tween.Easing.Linear.EaseNone = function ( k ) {
      return k;
  };

  ig.Tween.Easing.Quadratic.EaseIn = function ( k ) {
      return k * k;
  };

  ig.Tween.Easing.Quadratic.EaseOut = function ( k ) {
      return - k * ( k - 2 );
  };

  ig.Tween.Easing.Quadratic.EaseInOut = function ( k ) {
      if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
      return - 0.5 * ( --k * ( k - 2 ) - 1 );
  };

  ig.Tween.Easing.Cubic.EaseIn = function ( k ) {
      return k * k * k;
  };

  ig.Tween.Easing.Cubic.EaseOut = function ( k ) {
      return --k * k * k + 1;
  };

  ig.Tween.Easing.Cubic.EaseInOut = function ( k ) {
      if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
      return 0.5 * ( ( k -= 2 ) * k * k + 2 );
  };

  ig.Tween.Easing.Quartic.EaseIn = function ( k ) {
      return k * k * k * k;
  };

  ig.Tween.Easing.Quartic.EaseOut = function ( k ) {
      return - ( --k * k * k * k - 1 );
  }

  ig.Tween.Easing.Quartic.EaseInOut = function ( k ) {
      if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
      return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );
  };

  ig.Tween.Easing.Quintic.EaseIn = function ( k ) {
      return k * k * k * k * k;
  };

  ig.Tween.Easing.Quintic.EaseOut = function ( k ) {
      return ( k = k - 1 ) * k * k * k * k + 1;
  };

  ig.Tween.Easing.Quintic.EaseInOut = function ( k ) {
      if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
      return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );
  };

  ig.Tween.Easing.Sinusoidal.EaseIn = function ( k ) {
      return - Math.cos( k * Math.PI / 2 ) + 1;
  };

  ig.Tween.Easing.Sinusoidal.EaseOut = function ( k ) {
      return Math.sin( k * Math.PI / 2 );
  };

  ig.Tween.Easing.Sinusoidal.EaseInOut = function ( k ) {
      return - 0.5 * ( Math.cos( Math.PI * k ) - 1 );
  };

  ig.Tween.Easing.Exponential.EaseIn = function ( k ) {
      return k == 0 ? 0 : Math.pow( 2, 10 * ( k - 1 ) );
  };

  ig.Tween.Easing.Exponential.EaseOut = function ( k ) {
      return k == 1 ? 1 : - Math.pow( 2, - 10 * k ) + 1;
  };

  ig.Tween.Easing.Exponential.EaseInOut = function ( k ) {
      if ( k == 0 ) return 0;
      if ( k == 1 ) return 1;
      if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 2, 10 * ( k - 1 ) );
      return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );
  };

  ig.Tween.Easing.Circular.EaseIn = function ( k ) {
      return - ( Math.sqrt( 1 - k * k ) - 1);
  };

  ig.Tween.Easing.Circular.EaseOut = function ( k ) {
      return Math.sqrt( 1 - --k * k );
  };

  ig.Tween.Easing.Circular.EaseInOut = function ( k ) {
      if ( ( k /= 0.5 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
      return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);
  };

  ig.Tween.Easing.Elastic.EaseIn = function( k ) {
      var s, a = 0.1, p = 0.4;
      if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
      return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
  };

  ig.Tween.Easing.Elastic.EaseOut = function( k ) {
      var s, a = 0.1, p = 0.4;
      if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
      return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );
  };

  ig.Tween.Easing.Elastic.EaseInOut = function( k ) {
      var s, a = 0.1, p = 0.4;
      if ( k == 0 ) return 0; if ( k == 1 ) return 1; if ( !p ) p = 0.3;
      if ( !a || a < 1 ) { a = 1; s = p / 4; }
      else s = p / ( 2 * Math.PI ) * Math.asin( 1 / a );
      if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
      return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
  };

  ig.Tween.Easing.Back.EaseIn = function( k ) {
      var s = 1.70158;
      return k * k * ( ( s + 1 ) * k - s );
  };

  ig.Tween.Easing.Back.EaseOut = function( k ) {
      var s = 1.70158;
      return ( k = k - 1 ) * k * ( ( s + 1 ) * k + s ) + 1;
  };

  ig.Tween.Easing.Back.EaseInOut = function( k ) {
      var s = 1.70158 * 1.525;
      if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
      return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );
  };

  ig.Tween.Easing.Bounce.EaseIn = function( k ) {
      return 1 - ig.Tween.Easing.Bounce.EaseOut( 1 - k );
  };

  ig.Tween.Easing.Bounce.EaseOut = function( k ) {
      if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
          return 7.5625 * k * k;
      } else if ( k < ( 2 / 2.75 ) ) {
          return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
      } else if ( k < ( 2.5 / 2.75 ) ) {
          return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
      } else {
          return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
      }
  };

  ig.Tween.Easing.Bounce.EaseInOut = function( k ) {
      if ( k < 0.5 ) return ig.Tween.Easing.Bounce.EaseIn( k * 2 ) * 0.5;
      return ig.Tween.Easing.Bounce.EaseOut( k * 2 - 1 ) * 0.5 + 0.5;
  };
});