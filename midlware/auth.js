var req = require('../db/db_service');
var Rx = require('rxjs/Rx');
const crypto = require('crypto');
const secret = 'qoe218!398231!@#$';

module.exports = {
    userConfirmMailO: function (auth_key) {
        const q = "SELECT * FROM mail_confirm('" + auth_key + "');";
        return Rx.Observable.create((observer) => {
            try {
                req.request(q).subscribe(res => {
                    observer.next(res);
                    observer.complete();
                });
            } catch (e) {
                throw e;
            }
        })
    },
    userRegO: function (username, email, password_hash, token, auth_key) {
        const q = "SELECT * FROM registration('" + username + "', '" + email + "', '" + password_hash + "', '" + token + "', '" + auth_key + "')";
        return Rx.Observable.create((observer) => {
            try {
                req.request(q).subscribe(res => {
                    observer.next(res);
                    observer.complete();
                });
            } catch (e) {
                throw e;
            }
        })
    },
    authLoginO: function (email, password) {
        const password_hash = crypto.createHmac('sha256', secret).update(password).digest("hex");
        const token = crypto.createHmac('sha256', secret).update(password_hash).digest("hex");
        const q = "SELECT * FROM authorize_login('" + email + "','" + password_hash + "','" + token + "');";
        console.log(q);
        return Rx.Observable.create((observer) => {
            try {
                req.request(q).subscribe(res => {
                    observer.next(res);
                    observer.complete();
                });
            } catch (e) {
                throw e;
            }
        })
    },
    authToken: function (token, interval) {
        //interval in minutes
        const q = "SELECT * FROM authorize_token('" + token + "', " + interval + ");";
        return Rx.Observable.create((observer) => {
            try {
                req.request(q).subscribe(res => {
                    observer.next(res);
                    observer.complete();
                });
            } catch (e) {
                throw e;
            }
        })
    }
};
