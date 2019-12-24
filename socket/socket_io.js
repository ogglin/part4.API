const sio = require('socket.io');
module.exports = function(server) {
    const io = sio(server);
    io.set('origins', '*:*');
    return {
        register: function(namespace) {
            let nsp = io.of(namespace);
            return nsp;
        }
    }
}
