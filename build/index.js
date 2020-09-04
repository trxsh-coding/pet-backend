"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clients = exports.io = void 0;

var _index = _interopRequireDefault(require("../index.js"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _socket = _interopRequireDefault(require("socket.io"));

var _message = _interopRequireDefault(require("../models/message"));

var _user = _interopRequireDefault(require("../models/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var http = require('http');

var _process$env = process.env,
    PORT = _process$env.PORT,
    DB_CONNECTION = _process$env.DB_CONNECTION;
var server = http.createServer(_index["default"]);
var io = (0, _socket["default"])(server);
exports.io = io;
var clients = new Map();
exports.clients = clients;
io.on('connection', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(socket) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = socket.handshake.query.id;
            clients.set(id, {
              socketID: socket.id
            });

            _index["default"].set('socket', socket);

            _index["default"].set('io', io);

            _context.next = 6;
            return _user["default"].findByIdAndUpdate(id, {
              online: true
            });

          case 6:
            user = _context.sent;
            socket.on('disconnect', function (callback) {
              clients["delete"](socket.handshake.query.id);

              _user["default"].findByIdAndUpdate(id, {
                online: false,
                lastSeen: new Date()
              });
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

_mongoose["default"].connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function () {
  return console.log('u are connected to DB');
})["catch"](function (e) {
  return console.log(e);
});

server.listen(PORT, function () {
  return console.log("u are listening to ".concat(PORT, " port"));
});
//# sourceMappingURL=index.js.map