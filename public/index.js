/*global jQuery, OT*/
/*jshint devel:true*/
(function ($) {
  'use strict';
  var socket = new WebSocket('ws://localhost:8080', 'protocolOne');

  var initDrawTable = function (data) {
    var $playground = $('#playground');
    var $rows = data.map(function (row, rowIndex) {
      var $cells = row.map(function (cell, columnIndex) {
        return $('<td />').append(createInputText(rowIndex, columnIndex, cell));
      });
      return $('<tr />').append($cells);
    });
    var $table = $('<table />').append($rows);
    $playground.append($table);
  };

  var ot = new OT({
    onInit: initDrawTable
  });
  
  ot.setExecuteActions({
    updateCell: function (request) {
      var value = request.value;
      var data = ot.getData();
      data[value.rowIndex][value.columnIndex] = value.value;
      $('#R' + value.rowIndex + 'C' + value.columnIndex).val(value.value);
    }
  });

  ot.setTransformationMatrix({
    updateCell: {
      updateCell: function (newRequest, oldRequest) {
        if (newRequest.value.rowIndex !== oldRequest.value.rowIndex || newRequest.value.columnIndex !== oldRequest.value.columnIndex) {
          return newRequest;
        }
        if (newRequest.priority < oldRequest.priority) {
          return newRequest;
        }
        var value = JSON.parse(JSON.stringify(oldRequest.value));
        newRequest.value = value;
        return newRequest;
      }
    }
  });

  socket.onmessage = function (event) {
    ot.processRequest(event.data);
  };

  var change = function (rowIndex, columnIndex, value) {
    var message = ot.createMessage('updateCell', {
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      value: value
    });
    var request = JSON.parse(message);
    ot.execute(request);
    socket.send(message);
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