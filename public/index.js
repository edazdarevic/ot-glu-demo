/*global jQuery*/
/*jshint devel:true*/
(function ($) {
  'use strict';
  var socket = new WebSocket('ws://localhost:8080', 'protocolOne');
  var data, priority, states;
  var log = [];
  var que = [];

  var createMessage = function (action, value) {
    var json = {
      action: action,
      states: states,
      priority: priority,
      value: value
    };
    return JSON.stringify(json);
  };

  var execute = function (request) {
    switch (request.action) {
    case 'updateCell':
      updateCell(request);
      break;
    }
    states[request.priority] += 1;
    log.push(request);
  };

  var updateCell = function (request) {
    var value = request.value;
    data[value.rowIndex][value.columnIndex] = value.value;
    $('#R' + value.rowIndex + 'C' + value.columnIndex).val(value.value);
  };

  var compareState = function (requestState, currentState) {
    var shouldTransform = false;
    for (var i = 0; i < currentState.length; i += 1) {
      if (currentState[i] === requestState[i]) {
        continue;
      }
      if (currentState[i] > requestState[i]) {
        shouldTransform = true;
      } else {
        return 1;
      }
    }
    return (shouldTransform) ? -1 : 0;
  };

  var transform = function (newRequest, oldRequest) {
  // for now we only have updateCell, but this should use matrix when more actions are introduced
  if (newRequest.value.rowIndex !== oldRequest.value.rowIndex || newRequest.value.columnIndex !== oldRequest.value.columnIndex) {
    return newRequest;
  }
  if (newRequest.priority < oldRequest.priority) {
    return newRequest;
  }
  var request = JSON.parse(JSON.stringify(oldRequest));
  request.priority = newRequest.priority;
  return request;
};

  var doStuf = function (r) {
    var request = JSON.parse(r);
    switch (request.action) {
    case 'init':
      data = request.value.data;
      states = request.states;
      priority = request.priority;
      initDrawTable(data);
      break;
    case 'new-user':
      states[request.value] = 0;
      break;
    default:
      if (priority !== request.priority) {
        switch (request.action) {
        case 'updateCell':
          switch (compareState(request.states, states)) {
          case 0:
            // we can execute this action right away
            execute(request);
            break;
          case 1:
            // this action has to be put into que, and wait for other actions
            que.push(request);
            // TODO: when to fire que?
            break;
          case -1:
            // create transformation for this action
            for (var i = log.length - 1; i >= 0; i -= 1) {
              if (compareState(log[i].states, request.states) === 0) {
                break;
              }
            }
            var transformedRequest = request;
            for (var j = i; j < log.length; j += 1) {
              transformedRequest = transform(transformedRequest, log[j]);
            }
            execute(transformedRequest);
          }
          break;
        }
      }
    }
    console.log(data, states, log, que);
  };

  socket.onmessage = function (event) {
    doStuf(event.data);
  };

  var change = function (rowIndex, columnIndex, value) {
    var message = createMessage('updateCell', {
      rowIndex: rowIndex,
      columnIndex: columnIndex,
      value: value
    });
    var request = JSON.parse(message);
    execute(request);
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
}(jQuery));