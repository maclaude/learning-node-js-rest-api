// Socket io connection

/**
 * NPM import
 */
const socketIO = require('socket.io');

/**
 * Code
 */
let io;

const socketConnection = {
  init: httpServer => {
    io = socketIO(httpServer);
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io is not initialized');
    }
    return io;
  },
};

/**
 * Export
 */
module.exports = socketConnection;
