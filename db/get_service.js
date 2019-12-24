var req = require('../db/db_service');
var Rx = require('rxjs/Rx');

module.exports = {
    getCategoriesO: function () {
        const q = "SELECT * FROM categories";
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
    getGoodDetailO: function (pId) {
        q = "SELECT * FROM get_market_product_by_id(" + pId + ");";
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
    getUserGoodsO: function (user_id) {
        let q;
        if (user_id) {
            q = "SELECT ma.\"id\", ma.title, ma.\"options\", ma.price, ma.description, ma.images, ma.\"type\",\n" +
                "ma.address, ma.priority, c.name as category, b.\"name\" as brand, m.\"name\" as model, p.code as partcode\n" +
                "FROM market ma\n" +
                "left join brands b ON ma.brand_id = b.\"id\"\n" +
                "left join categories c ON ma.category_id = c.\"id\"\n" +
                "left join models m ON ma.model_id = m.\"id\"\n" +
                "left join partcodes p on ma.partcode_id = p.id\n" +
                "WHERE user_id = " + user_id;
        }
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
    getGoodsO: function (cat_id) {
        let q;
        if (cat_id) {
            q = "SELECT ma.\"id\", ma.title, ma.\"options\", ma.price, ma.description, ma.images, ma.\"type\",\n" +
                "ma.address, ma.priority, c.name as category, b.\"name\" as brand, m.\"name\" as model, p.code as partcode\n" +
                "FROM market ma\n" +
                "left join brands b ON ma.brand_id = b.\"id\"\n" +
                "left join categories c ON ma.category_id = c.\"id\"\n" +
                "left join models m ON ma.model_id = m.\"id\"\n" +
                "left join partcodes p on ma.partcode_id = p.id\n" +
                "WHERE category_id = " + cat_id +
                "ORDER BY ma.priority ASC";
        } else {
            q = "SELECT ma.\"id\", ma.title, ma.\"options\", ma.price, ma.description, ma.images, ma.\"type\",\n" +
                "ma.address, ma.priority, c.name as category, b.\"name\" as brand, m.\"name\" as model, p.code as partcode\n" +
                "FROM market ma\n" +
                "left join brands b ON ma.brand_id = b.\"id\"\n" +
                "left join categories c ON ma.category_id = c.\"id\"\n" +
                "left join models m ON ma.model_id = m.\"id\"\n" +
                "left join partcodes p on ma.partcode_id = p.id\n" +
                "ORDER BY ma.priority ASC";
        }

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
    getTopGoodsO: function () {
        const q = "SELECT ma.\"id\", ma.title, ma.\"options\", ma.price, ma.description, ma.images, ma.\"type\", ma.address,\n" +
            "ma.priority, c.name as category, b.\"name\" as brand, m.\"name\" as model, p.code as partcode\n" +
            "FROM market ma\n" +
            "left join brands b ON ma.brand_id = b.\"id\"\n" +
            "left join categories c ON ma.category_id = c.\"id\"\n" +
            "left join models m ON ma.model_id = m.\"id\"\n" +
            "left join partcodes p on ma.partcode_id = p.id\n" +
            "ORDER BY ma.priority ASC LIMIT 10";
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
    getSearchO: function (s) {
        const q = "SELECT ma.\"id\", ma.title, ma.\"options\", ma.price, ma.description, ma.images, ma.\"type\",\n" +
            "ma.address, ma.priority, c.name as category, b.\"name\" as brand, m.\"name\" as model, p.code as partcode\n" +
            "FROM market ma\n" +
            "left join brands b ON ma.brand_id = b.\"id\"\n" +
            "left join categories c ON ma.category_id = c.\"id\"\n" +
            "left join models m ON ma.model_id = m.\"id\"\n" +
            "left join partcodes p on ma.partcode_id = p.id\n" +
            "WHERE ma.title ilike '%" + s + "%' or ma.title ilike '%" + s + "%'\n" +
            "ORDER BY ma.priority ASC";
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
    getModelO: function (id) {
        let q;
        if (id) {
            q = "SELECT * FROM models WHERE brand_id = " + id;
        } else {
            q = "SELECT * FROM models;";
        }
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
    getBrandsO: function () {
        const q = "SELECT * FROm brands;";
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
