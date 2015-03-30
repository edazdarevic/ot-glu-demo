/*jshint devel:true*/
/*global OT:true*/
'use strict';
var OT = (function () {
  var priority, data;
  var states = [];
  var log = [];
  var que = [];
  var executeActions = {};
  var transformationMatrix = {};
  var options;

  var OT = function (o) {
    options = o || {};
  };

  OT.prototype.setData = function (d) {
    data = d;
  };

  OT.prototype.getData = function () {
    return data;
  };

  OT.prototype.setStates = function (s) {
    states = s;
  };

  OT.prototype.getPriority = function () {
    return priority;
  };

  OT.prototype.setExecuteActions = function (actions) {
    executeActions = actions;
  };

  OT.prototype.setTransformationMatrix = function (matrix) {
    transformationMatrix = matrix;
  };

  OT.prototype.createMessage = function (action, value) {
    var json = {
      action: action,
      states: states,
      priority: priority,
      value: value
    };
    return JSON.stringify(json);
  };

  var execute = function (request) {
    var action = executeActions[request.action];
    if (action) {
      action(request);
    }
    states[request.priority] += 1;
    log.push(request);
  };

  OT.prototype.execute = execute;

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
    if (transformationMatrix[newRequest.action] && transformationMatrix[newRequest.action][oldRequest.action]) {
      return transformationMatrix[newRequest.action][oldRequest.action](newRequest, oldRequest);
    }
    return newRequest;
  };

  OT.prototype.processRequest = function (r) {
    var request = JSON.parse(r);
    switch (request.action) {
    case 'init':
      data = request.value.data;
      priority = request.value.priority;
      states = request.value.states;
      if (typeof options.onInit === 'function') {
        options.onInit(data);
      }
      break;
    case 'new-user':
      states[request.value] = 0;
      if (typeof options.onNewUser === 'function') {
        options.onNewUser(request);
      }
      break;
    default:
      if (priority !== request.priority) {
        switch (compareState(request.states, states)) {
        case 0:
          // we can execute this action right away
          execute(request);
          break;
        case 1:
          // this action has to be put into que, and wait for other actions
          // but since we use web socket, this shouldn't happen anyway
          que.push(request);
          // TODO: when to fire que?
          break;
        case -1:
          // create transformation for this action
          for (var i = log.length - 1; i >= 0; i -= 1) {
            // find all logs that happened after this request was craeted
            var compareStateStatus = compareState(log[i].states, request.states);
            if (compareStateStatus === -1) {
              break;
            }
          }
          var transformedRequest = request;
          for (var j = i + 1; j < log.length; j += 1) {
            transformedRequest = transform(transformedRequest, log[j]);
          }
          execute(transformedRequest);
        }
      }
    }
    console.log(data, states, log, que);
  };

  return OT;
}());