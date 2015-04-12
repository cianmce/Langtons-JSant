"use strict";

var loop_count = 0;
$(function(){
  create_table();
  add_ant(50,40);
  var loop_interval = setInterval(loop, 1);
});

function create_table(){
  var size = $('.jsant').data('size').split(/\D+/);
  var tableHTML = '<table>';
  for(var y=0; y<size[1]; y++){
    tableHTML += '<tr class="">';
    for(var x=0; x<size[0]; x++){
      tableHTML += '<td id="x'+x+'y'+y+'" class=""></td>';
    }
    tableHTML += '</tr>';
  }
  $('.jsant').append(tableHTML);
}

function add_ant(x,y){
  $('#x'+x+'y'+y).addClass('ant');
  $('#x'+x+'y'+y).attr('data-direction', 'down');
}

function rotate_direction(current, direction){
  current = current || 'up';
  var directions = ['up', 'right', 'down', 'left'];
  var dir_index = directions.indexOf(current);
  if(dir_index == -1){
    return 'up';
  }
  if(direction=='right'){
    return directions[(dir_index+1)%directions.length];
  }else{
    return directions[(dir_index-1<0)?directions.length-1:dir_index-1];
  }
}

function move_forward(pos, direction){
  switch(direction) {
    case 'up':
      pos[0]--;
      break;
    case 'right':
      pos[1]++;
      break;
    case 'down':
      pos[0]++;
      break;
    case 'left':
      pos[1]--;
      break;
  }
  return pos;
}

function loop(){
  loop_count++;
  if(loop_count%100==0){
    console.log('Count: '+loop_count);
  }
  // Foreach .ant move and set cell below

  $('.ant').each(function(){
    var $ant = $(this);
    var ant_pos = $ant.attr('id').substr(1).split(/\D/);
    var ant_dir = $ant.attr('data-direction');
    var new_dir;

    if(!$ant.hasClass('black')){
      // Turn Right
      new_dir = rotate_direction(ant_dir, 'right');
    }else{
      // Turn Left
      new_dir = rotate_direction(ant_dir, 'left');
    }

    // Invert cell color
    $ant.toggleClass('black');

    // Move forward
    var new_pos = move_forward(ant_pos, new_dir);

    // Remove old ant
    $ant.removeClass('ant');
    // Place new ant
    var $new_ant = $('#x'+new_pos[0]+'y'+new_pos[1]);
    $new_ant.addClass('ant');
    $new_ant.attr('data-direction', new_dir);


  });
}
