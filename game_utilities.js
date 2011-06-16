ig.module(
  'plugins.game_utilities'
)
.requires(
  'impact.game'
)
.defines(function() {
  ig.Game.inject({
    
    // Return an array of entities that are under the mouse
    entitiesUnderMouse: function(){
      var mouse_x = ig.input.mouse.x;
      var mouse_y = ig.input.mouse.y;

      var entities = this.entities;
      var under_mouse = [];
      for(var x = 0; x < entities.length; x = x+1){
        var entity = entities[x];
        var pos_x = entity.pos.x;
        var pos_y = entity.pos.y;
        if( pos_x <= mouse_x && mouse_x <= pos_x + entity.size.x &&
            pos_y <= mouse_y && mouse_y <= pos_y + entity.size.y ){
          under_mouse.push(entity);
        }
      }
      return under_mouse;
    }
  });
});