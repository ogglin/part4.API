const db = require('../db/get_service');
var clients = [];

/**
 * @return {boolean}
 */
function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = function (app, io) {
    var controller = require("../controller")(io);
    const _get = controller.getInit();
    _get.on('connection', function (gsocket) {
        console.log(gsocket.id);
        gsocket.on('get', function (data) {
            var isJson = IsJsonString(data);
            if (isJson) {
                const obj = JSON.parse(data);
                if (obj['categories']) {
                    db.getCategoriesO().subscribe(res => {
                        gsocket.emit('get', '{"categories":' + JSON.stringify(res) + '}')
                    });
                }
                if (obj['product']) {
                    db.getGoodDetailO(obj['product']).subscribe(res => {
                        gsocket.emit('get', '{"product":' + JSON.stringify(res) + '}')
                    })
                }
                if (obj['goods']) {
                    if (obj['cat_id']) {
                        db.getGoodsO(obj['cat_id']).subscribe(res => {
                            gsocket.emit('get', '{"goods":' + JSON.stringify(res) + '}')
                        })
                    } else if(obj['user_id']) {
                        db.getUserGoodsO(obj['user_id']).subscribe(res => {
                            gsocket.emit('get', '{"usergoods":' + JSON.stringify(res) + '}')
                        })
                    } else {
                        db.getGoodsO().subscribe(res => {
                            gsocket.emit('get', '{"allgoods":' + JSON.stringify(res) + '}')
                        })
                    }
                }
                if (obj['topgoods']) {
                    db.getTopGoodsO().subscribe(res => {
                        gsocket.emit('get', '{"topgoods":' + JSON.stringify(res) + '}')
                    })
                }
                if (obj['search']) {
                    db.getSearchO(obj['search']).subscribe(res => {
                        gsocket.emit('get', '{"allgoods":' + JSON.stringify(res) + '}')
                    })
                }
                if (obj['models']) {
                    db.getModelO(obj['models']).subscribe(res => {
                        gsocket.emit('get', '{"models":' + JSON.stringify(res) + '}')
                    })
                }
                if (obj['brands']) {
                    db.getBrandsO().subscribe(res => {
                        gsocket.emit('get', '{"brands":' + JSON.stringify(res) + '}')
                    })
                }
            }
        })
    });
};
