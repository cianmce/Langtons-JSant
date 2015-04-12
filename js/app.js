"use strict";

$(function(){
  create_table();
});

function create_table(){
  var size = $('.jsant').data('size').split(/\D+/);
  console.log(size);
  var tableHTML = '<table>';
  for(var i=0; i<size[1]; i++){
    tableHTML += '<tr>';
    for(var j=0; j<size[0]; j++){
      tableHTML += '<td></td>';
    }
    tableHTML += '</tr>';
  }
  $('.jsant').append(tableHTML);
}
