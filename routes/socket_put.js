const db = require('../db/put_service');
const auth = require('../midlware/auth');
var registration = require('../midlware/registration');
var clients = {};
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

module.exports = function (app,io) {
    var controller = require("../controller")(io);
    const _put = controller.putInit();
    const _get = controller.getInit();
    _put.on('connection', function (psocket) {
        console.log(psocket.id);
        psocket.on('put', function (data) {
            var isJson = IsJsonString(data);
            if(isJson) {
                const obj = JSON.parse(data);
                if(obj['auth_email']){
                    auth.authLoginO(obj['auth_email'], obj['auth_pass']).subscribe(res => {
                        psocket.emit('put','{"auth_email":'+JSON.stringify(res)+'}')
                    });
                }
                if(obj['auth_token']){
                    auth.authToken(obj['auth_token'], 1140).subscribe(res => {
                        psocket.emit('put','{"auth_token":'+JSON.stringify(res)+'}')
                    });
                }
                if(obj['mail_send']){
                    db.sendMailO(obj['mail'], obj['subject'], obj['text'], obj['html']).subscribe(res => {
                        psocket.emit('put','{"mail_send":'+JSON.stringify(res)+'}')
                    });
                }
                if(obj['mail_send_reg']){
                    registration.regO(obj['login'], obj['mail'], obj['password']).subscribe(res => {
                        if(res['status'] === 'user_id') {
                            db.sendMailO(res['mail'], res['subject'], res['text'], res['html']).subscribe(msg => {
                                _get.emit('get','{"mail_send_reg":'+JSON.stringify(res)+'}')
                            });
                        } else if(res['status'] === 'exist') {
                            psocket.emit('put','{"mail_send_reg":'+JSON.stringify(res)+'}')
                        }
                    });
                }
                if(obj['mail_confirm']){
                    auth.userConfirmMailO(obj['mail_confirm']).subscribe(res => {
                        psocket.emit('put','{"mail_confirm":'+JSON.stringify(res)+'}')
                    });
                };
                if(obj['putCategory']){
                    db.putCategoriesO(obj['putCategory'], obj['description']).subscribe(res=>{
                        _get.emit('get','{"categories":'+JSON.stringify(res)+'}')
                    });
                }
                if(obj['putGoods']){
                    console.log(obj);
                    db.putGoodsO(
                        obj['user_id'],
                        obj['title'],
                        obj['brand_id'],
                        obj['category_id'],
                        obj['options'],
                        obj['price'],
                        obj['description'],
                        obj['images'],
                        obj['type'],
                        obj['model_id'],
                        obj['address'],
                        obj['partcode']
                    ).subscribe(res=>{
                        _get.emit('get','{"putGoods":'+JSON.stringify(res)+'}')
                    })
                }
                if(obj['editGoods']){
                    console.log(obj);
                    db.putEditGoodsO(
                        obj['user_id'],
                        obj['title'],
                        obj['brand_id'],
                        obj['category_id'],
                        obj['options'],
                        obj['price'],
                        obj['description'],
                        obj['images'],
                        obj['type'],
                        obj['model_id'],
                        obj['address'],
                        obj['partcode'],
                        obj['prod_id']
                    ).subscribe(res=>{
                        _get.emit('get','{"putGoods":'+JSON.stringify(res)+'}')
                    })
                }
            }
        })
    })
};
