/*global jQuery, OT, tableChangeRules*/
/*jshint devel:true*/
(function ($) {
  'use strict';
  var socket = new WebSocket('ws://localhost:8080', 'protocolOne');

  var createRow = function (row, rowIndex) {
    var $cells = row.map(function (cell, columnIndex) {
      return $('<td />').append(createInputText(rowIndex, columnIndex, cell));
    });
    return $('<tr />').append($cells);
  };

  var initDrawTable = function (data) {
    var $playground = $('#playground');
    var $rows = data.map(createRow);
    var $table = $('<table />').append($rows);
    $playground.html($table);
  };

  var ot = new OT({
    onInit: initDrawTable
  });
  tableChangeRules(ot);

  ot.onModelChange('updateCell', function (request) {
    var value = request.value;
    $('#R' + value.rowIndex + 'C' + value.columnIndex).val(value.value);
  });

  ot.onModelChange('addRow', function () {
    initDrawTable(ot.getData());
  });

  ot.onModelChange('deleteRow', function () {
    initDrawTable(ot.getData());
  });

  socket.onmessage = function (event) {
    ot.processRequest(event.data);
  };

  var triggerRequest = function (message) {
    var request = JSON.parse(message);
    ot.execute(request);
    socket.send(message);
  };

  var addRow = function () {
    var message = ot.createMessage('addRow', {
      rowIndex: +$('#row-position').val()
    });
    triggerRequest(message);
  };
  $('#add-row').on('click', addRow);

  var deleteRow = function () {
    var message = ot.createMessage('deleteRow', {
      rowIndex: +$('#row-position').val()
    });
    triggerRequest(message);
  };
  $('#delete-row').on('click', deleteRow);

  var change = function (rowIndex, columnIndex, value) {
    var message = ot.createMessage('updateCell', {
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      value: value
    });
    triggerRequest(message);
  };

  var createInputText = function (rowIndex, columnIndex, value) {
    var inputValue = value;
    return $('<input />', {
      id: 'R' + rowIndex + 'C' + columnIndex,
      type: 'text',
      value: value,
      on: {
        blur: function () {
          if (inputValue !== $(this).val()) {
            inputValue = $(this).val();
            change(rowIndex, columnIndex, inputValue);
          }
        }
      }
    });
  };

}(jQuery));