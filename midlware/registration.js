const Rx = require('rxjs/Rx');
const auth = require('../midlware/auth');
const crypto = require('crypto');
const secret = 'qoe218!398231!@#$';

module.exports = {
    regO: function (username, email, password) {
        return Rx.Observable.create((observer) => {
            (async () => {
                let user = '';
                if (username) {
                    user = username;
                }
                const password_hash = crypto.createHmac('sha256', secret).update(password).digest("hex");
                const token = crypto.createHmac('sha256', secret).update(password_hash).digest("hex");
                const auth_key  = crypto.randomBytes(16).toString('hex');
                auth.userRegO(user, email, password_hash, token, auth_key).subscribe(res => {
                    const r = res[0].registration.split(':');
                    const body = {
                        mail: email,
                        subject: 'Подтверждение регистрации на сайте Part4Market',
                        text: 'Скопируйте ссылку https://market.part4.info/confirm?mail=' +auth_key+ ' и откройте ее в браузере для завершения регистрации.',
                        html: 'Перейдтите по <a href="https://market.part4.info/confirm?mail=' +auth_key+ '" target="_blank">ссылке</a> для завершения регистрация.<br> Если ссылка не активна то скопируйте ссылку https://market.part4.info/confirm?mail=' +auth_key+ ' и откройте ее в браузере.',
                        status: r[0],
                        user_id: r[1]
                    };
                    observer.next(body);
                });
            })().catch(err => {
                console.log(err);
                return {error: e.detail};
            });
        });
    }
};
