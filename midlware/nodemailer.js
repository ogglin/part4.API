const nodemailer = require('nodemailer');
const Rx = require('rxjs/Rx');

let transport = nodemailer.createTransport({
        service: 'Yandex',
        auth: {
            user: 'mail@part4.info',
            pass: '100,jxtrgbdf'
        }
    }
);
module.exports = {
    sendMail: function (body) {
        return Rx.Observable.create((observer) => {
                (async () => {
                    result = await transport.sendMail(body);
                    observer.next(result);
                })().catch(err => {
                    console.log(err);
                    return {error: e.detail};
                });
            }
        )
    }
};
