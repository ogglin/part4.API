/*
 * Contains the routing logic
 */
module.exports = function (app,io) {
//passing while creating the instance of controller for the first time.

    var controller = require("./controller")(io);
    controller.getInit();
    controller.putInit();
};
