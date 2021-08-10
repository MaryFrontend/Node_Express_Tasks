"use strict";

var express = require('express');

var _require = require('./tasks.service'),
    getTasks = _require.getTasks,
    getTaskById = _require.getTaskById,
    createTask = _require.createTask,
    updateTask = _require.updateTask,
    deleteTask = _require.deleteTask;

var _require2 = require('../helpers/validation'),
    validateTask = _require2.validateTask;

var _require3 = require('../helpers/response'),
    buildResponse = _require3.buildResponse;

var _require4 = require('../helpers/error'),
    ErrorHandler = _require4.ErrorHandler,
    handleError = _require4.handleError;

console.log('Conflict here!');
var taskRouter = express.Router();
taskRouter.get('/', function _callee(req, res) {
  var tasks;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(getTasks());

        case 3:
          tasks = _context.sent;
          return _context.abrupt("return", buildResponse(res, 200, tasks));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0 instanceof ErrorHandler)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", handleError(_context.t0, res));

        case 11:
          return _context.abrupt("return", buildResponse(res, 500, 'Something get wrong'));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
taskRouter.get('/:id', function _callee2(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getTaskById(id));

        case 4:
          task = _context2.sent;
          return _context2.abrupt("return", buildResponse(res, 200, task));

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);

          if (!(_context2.t0 instanceof ErrorHandler)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", handleError(_context2.t0, res));

        case 12:
          return _context2.abrupt("return", buildResponse(res, 500, 'Something get wrong'));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
taskRouter.post('/', validateTask, function _callee3(req, res) {
  var task, create;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          task = req.body;
          _context3.next = 4;
          return regeneratorRuntime.awrap(createTask(task));

        case 4:
          create = _context3.sent;
          return _context3.abrupt("return", buildResponse(res, 201, create));

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);

          if (!(_context3.t0 instanceof ErrorHandler)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", handleError(_context3.t0, res));

        case 12:
          return _context3.abrupt("return", buildResponse(res, 500, 'Something get wrong'));

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
taskRouter.put('/:id', function _callee4(req, res) {
  var id, task, update;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          task = req.body;
          _context4.next = 5;
          return regeneratorRuntime.awrap(updateTask(id, task));

        case 5:
          update = _context4.sent;
          return _context4.abrupt("return", buildResponse(res, 200, update));

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);

          if (!(_context4.t0 instanceof ErrorHandler)) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", handleError(_context4.t0, res));

        case 13:
          return _context4.abrupt("return", buildResponse(res, 500, 'Something get wrong'));

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 9]]);
});
taskRouter["delete"]('/:id', function _callee5(req, res) {
  var id, task;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(deleteTask(parseInt(id)));

        case 4:
          task = _context5.sent;
          return _context5.abrupt("return", buildResponse(res, 204, "Task with id: ".concat(id, " deleted successful")));

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);

          if (!(_context5.t0 instanceof ErrorHandler)) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", handleError(_context5.t0, res));

        case 12:
          return _context5.abrupt("return", buildResponse(res, 500, 'Something get wrong'));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = taskRouter;