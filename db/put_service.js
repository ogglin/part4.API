var req = require('../db/db_service');
var Rx = require('rxjs/Rx');
var mailer = require('../midlware/nodemailer');

module.exports = {
    sendMailO: function (mail, subject, text, html) {
        const body = {
            from: "Part4 Info <mail@part4.info>",
            to: mail,
            subject: subject,
            text: text,
            html: html
        };
        return Rx.Observable.create((observer) => {
            try {
                mailer.sendMail(body).subscribe(res => {
                    observer.next(res);
                    observer.complete();
                });
            } catch (e) {
                throw e;
            }
        });
    },
    putCategoriesO: function (category, description) {
        const q = "INSERT INTO categories (title, description) VALUES ('" + category + "','" + description + "');";
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
    putGoodsO: function (user_id, title, brand_id, category_id, options, price, description, images, type, model_id, address, partcode) {
        const q = "SELECT * FROM add_product_to_market("+user_id+",'" + title + "'," + brand_id + "," + category_id + ",'" + options + "'," + price + ",'" +
            description + "','" + images + "','" + type + "'," + model_id + ",'" + address + "','" + partcode+ "');";
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
    putEditGoodsO: function (user_id, title, brand_id, category_id, options, price, description, images, type, model_id, address, partcode, prod_id) {
        const q = "SELECT * FROM edit_product_to_market("+user_id+",'" + title + "'," + brand_id + "," + category_id + ",'" + options + "'," + price + ",'" +
            description + "','" + images + "','" + type + "'," + model_id + ",'" + address + "','" + partcode+ "',"+prod_id+");";
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
    }
};
